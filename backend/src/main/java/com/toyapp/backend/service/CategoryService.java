package com.toyapp.backend.service;

import com.toyapp.backend.dto.CategoryDTO;
import com.toyapp.backend.model.Category;
import com.toyapp.backend.repository.CategoryRepository;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService( CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> getAllCategories(){
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CategoryDTO> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::convertToDTO);
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        category = categoryRepository.save(category);
        return convertToDTO(category);
    }

    public Optional<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO) {
        if (categoryRepository.existsById(id)) {
            Category category = convertToEntity(categoryDTO);
            category.setId(id);
            category = categoryRepository.save(category);
            return Optional.of(convertToDTO(category));
        }
        return Optional.empty();
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    private CategoryDTO convertToDTO(Category category){
        return new CategoryDTO(category.getId(), category.getName(), category.getDescription(), category.getParentId());
    }

    private Category convertToEntity(CategoryDTO categoryDTO) {
        return new Category(categoryDTO.getId(), categoryDTO.getName(), categoryDTO.getDescription(), categoryDTO.getParentId());
    }
}

