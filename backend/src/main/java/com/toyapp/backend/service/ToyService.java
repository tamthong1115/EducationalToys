package com.toyapp.backend.service;

import com.toyapp.backend.dto.toy.CreateToyDTO;
import com.toyapp.backend.dto.toy.ToyResponseDTO;
import com.toyapp.backend.model.*;
import com.toyapp.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
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
        Toy toy = new Toy();
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

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            toy.setSupplier(user);
        }else{
            throw new RuntimeException("User not found");
        }
        toyRepository.save(toy);

        List<String> imageUrls = cloudinaryService.uploadToyImages(createToyDTO.getImages());
        for (String imageUrl : imageUrls) {
            ToyImage toyImage = new ToyImage();
            toyImage.setImageUrl(imageUrl);
            toyImage.setToy(toy);
            toyImageRepository.save(toyImage);
        }

        List<Category> categories = Stream.of(createToyDTO.getCategoryIds())
                .map(categoryId -> categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Category not found")))
                .collect(Collectors.toList());

        for (Category category : categories) {
            ToyCategory toyCategory = new ToyCategory();
            toyCategory.setToy(toy);
            toyCategory.setCategory(category);
            toyCategoryRepository.save(toyCategory);
        }
        
        return new ToyResponseDTO(
                toy.getId(),
                categories.stream().map(Category::getId).toArray(Long[]::new), // Convert List<Long> to Long[]
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
