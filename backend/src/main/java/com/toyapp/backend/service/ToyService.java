package com.toyapp.backend.service;

import com.toyapp.backend.dto.toy.CreateToyDTO;
import com.toyapp.backend.dto.toy.ToyResponseDTO;
import com.toyapp.backend.model.*;
import com.toyapp.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ToyService {
    private final ToyRepository toyRepository;
    private final ToyImageRepository toyImageRepository;
    private final CloudinaryService cloudinaryService;
    private final CategoryRepository categoryRepository;
    private final ToyCategoryRepository toyCategoryRepository;
    private final UserRepository userRepository;

    public ToyService(
            ToyRepository toyRepository,
            ToyImageRepository toyImageRepository,
            CloudinaryService cloudinaryService,
            CategoryRepository categoryRepository,
            ToyCategoryRepository toyCategoryRepository,
            UserRepository userRepository) {
        this.toyRepository = toyRepository;
        this.toyImageRepository = toyImageRepository;
        this.cloudinaryService = cloudinaryService;
        this.categoryRepository = categoryRepository;
        this.toyCategoryRepository = toyCategoryRepository;
        this.userRepository = userRepository;
    }


    @Transactional
    public ToyResponseDTO createToy(CreateToyDTO createToyDTO) {
        Toy toy = mapToToy(createToyDTO, null);
        User user = getCurrentUser();
        toy.setSupplier(user);
        toyRepository.save(toy);

        List<String> imageUrls = uploadImages(createToyDTO.getImages(), toy);
        List<Category> categories = getCategories(createToyDTO.getCategoryIds());
        saveToyCategories(toy, categories);

        return mapToToyResponseDTO(toy, imageUrls, categories);
    }

    @Transactional
    public ToyResponseDTO getToyResponseById(Long id) {
        Optional<Toy> optionalToy = toyRepository.findById(id);
        Toy toy = optionalToy.orElseThrow(() -> new RuntimeException("Toy not found"));
        List<String> imageUrls = toy.getImages().stream()
                .map(ToyImage::getImageUrl)
                .collect(Collectors.toList());
        List<Category> categories = toy.getCategories().stream()
                .map(ToyCategory::getCategory)
                .collect(Collectors.toList());
        return mapToToyResponseDTO(toy, imageUrls, categories);
    }

    @Transactional
    public Optional<Toy> getToyById(Long id) {
        return toyRepository.findById(id);
    }


    @Transactional
    public List<ToyResponseDTO> getAllToys() {
        List<Toy> toys = toyRepository.findAll();
        return toys.stream()
                .map(toy -> {
                    List<String> imageUrls = toy.getImages().stream()
                            .map(ToyImage::getImageUrl)
                            .collect(Collectors.toList());
                    List<Category> categories = toy.getCategories().stream()
                            .map(ToyCategory::getCategory)
                            .collect(Collectors.toList());
                    return mapToToyResponseDTO(toy, imageUrls, categories);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public ToyResponseDTO updateToy(Long id, CreateToyDTO createToyDTO) {
        Toy toy = toyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Toy not found"));
        mapToToy(createToyDTO, toy);
        toyRepository.save(toy);


        // Remove old images that are not in the new list
        List<String> newImageUrls = createToyDTO.getImages().stream()
                .map(MultipartFile::getOriginalFilename)
                .toList();
        List<ToyImage> oldImages = toy.getImages();
        for (ToyImage oldImage : oldImages) {
            if (!newImageUrls.contains(oldImage.getImageUrl())) {
                cloudinaryService.deleteImage(oldImage.getImageUrl());
                toyImageRepository.delete(oldImage);
            }
        }

        List<String> imageUrls = uploadImages(createToyDTO.getImages(), toy);

        // Remove old categories that are not in the new list
        List<Category> newCategories = getCategories(createToyDTO.getCategoryIds());
        List<ToyCategory> oldCategories = toy.getCategories();
        for (ToyCategory oldCategory : oldCategories) {
            if (!newCategories.contains(oldCategory.getCategory())) {
                toyCategoryRepository.delete(oldCategory);
            }
        }


        List<Category> categories = getCategories(createToyDTO.getCategoryIds());
        saveToyCategories(toy, categories);

        return mapToToyResponseDTO(toy, imageUrls, categories);
    }

    @Transactional
    public List<ToyResponseDTO> searchToys(String query, Pageable pageable) {
        query = query.toLowerCase();
        Page<Toy> toys = toyRepository.searchByNameOrDescription(query, pageable);
        List<Toy> content = toys.getContent();
        return content.stream()
                .map(toy -> mapToToyResponseDTO(toy, toy.getImages().stream()
                                .map(ToyImage::getImageUrl)
                                .collect(Collectors.toList()),
                        toy.getCategories().stream()
                                .map(ToyCategory::getCategory)
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteToy(Long id) {
        Toy toy = toyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Toy not found"));
        toyRepository.delete(toy);

        List<ToyImage> toyImages = toy.getImages();
        for (ToyImage toyImage : toyImages) {
            cloudinaryService.deleteImage(toyImage.getImageUrl());
            toyImageRepository.delete(toyImage);
        }

        List<ToyCategory> toyCategories = toy.getCategories();
        toyCategoryRepository.deleteAll(toyCategories);
    }

    private Toy mapToToy(CreateToyDTO createToyDTO, Toy toy) {
        if (toy == null) {
            toy = new Toy();
        }
        toy.setName(createToyDTO.getName());
        toy.setDescription(createToyDTO.getDescription());
        toy.setAge_range(createToyDTO.getAge_range());
        toy.setPrice(createToyDTO.getPrice());
        toy.setStock(createToyDTO.getStock());
        toy.setAvailable_for_rent(createToyDTO.getAvailable_for_rent());
        toy.setAvailable_for_sale(createToyDTO.getAvailable_for_sale());
        toy.setManufacturer(createToyDTO.getManufacturer());
        toy.setWeight(createToyDTO.getWeight());
        toy.setMaterial(createToyDTO.getMaterial());
        return toy;
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private List<String> uploadImages(List<MultipartFile> images, Toy toy) {
        List<String> imageUrls = cloudinaryService.uploadToyImages(images);
        for (String imageUrl : imageUrls) {
            ToyImage toyImage = new ToyImage();
            toyImage.setImageUrl(imageUrl);
            toyImage.setToy(toy);
            toyImageRepository.save(toyImage);
        }
        return imageUrls;
    }

    private List<Category> getCategories(Long[] categoryIds) {
        return Stream.of(categoryIds)
                .map(categoryId -> categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Category not found")))
                .collect(Collectors.toList());
    }

    private void saveToyCategories(Toy toy, List<Category> categories) {
        for (Category category : categories) {
            if (!toyCategoryRepository.existsByToyAndCategory(toy, category)) {
                ToyCategory toyCategory = new ToyCategory();
                toyCategory.setToy(toy);
                toyCategory.setCategory(category);
                toyCategoryRepository.save(toyCategory);
            }
        }
    }

    private ToyResponseDTO mapToToyResponseDTO(Toy toy, List<String> imageUrls, List<Category> categories) {
        return new ToyResponseDTO(
                toy.getId(),
                categories.stream()
                        .map(Category::getName)
                        .toArray(String[]::new),
                imageUrls.toArray(new String[0]),
                toy.getName(),
                toy.getDescription(),
                toy.getAge_range(),
                toy.getPrice(),
                toy.getStock(),
                toy.getAvailable_for_rent(),
                toy.getAvailable_for_sale(),
                toy.getManufacturer(),
                toy.getWeight(),
                toy.getMaterial(),
                toy.getSupplier().getId()
        );
    }


}
