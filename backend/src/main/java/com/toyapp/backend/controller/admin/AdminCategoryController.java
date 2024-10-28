package com.toyapp.backend.controller.admin;

import com.toyapp.backend.dto.category.CategoryDTO;
import com.toyapp.backend.dto.category.CreateCategoryDTO;
import com.toyapp.backend.service.CategoryService;
import com.toyapp.backend.service.CloudinaryService;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/category")
public class AdminCategoryController extends BaseAdminController {

    private final CategoryService categoryService;
    private final CloudinaryService cloudinaryService;

    public AdminCategoryController(CategoryService categoryService, CloudinaryService cloudinaryService) {
        this.categoryService = categoryService;
        this.cloudinaryService = cloudinaryService;
    }


    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> createCategory(@RequestParam("name") String name,
                                                      @RequestParam("image") MultipartFile image) {
        String imageUrl = cloudinaryService.uploadCategoryImage(image);
        CreateCategoryDTO createCategoryDTO = new CreateCategoryDTO();
        createCategoryDTO.setName(name);
        createCategoryDTO.setImage_url(imageUrl);
        
        return ResponseEntity.ok(categoryService.createCategory(createCategoryDTO));
    }

    @PutMapping
    public ResponseEntity<CategoryDTO> updateCategory(@RequestParam Long id, @RequestBody CategoryDTO categoryDTO) {
        Optional<CategoryDTO> updatedCategory = categoryService.updateCategory(id, categoryDTO);
        return updatedCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PatchMapping
    public ResponseEntity<CategoryDTO> patchCategory(@RequestParam Long id, @RequestBody CategoryDTO categoryDTO) {
        Optional<CategoryDTO> existingCategory = categoryService.getCategoryById(id);
        if (existingCategory.isPresent()) {
            CategoryDTO existing = getCategoryDTO(categoryDTO, existingCategory);
            Optional<CategoryDTO> updatedCategory = categoryService.updateCategory(id, existing);
            return updatedCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.notFound().build();
    }

    @NotNull
    private static CategoryDTO getCategoryDTO(CategoryDTO categoryDTO, Optional<CategoryDTO> existingCategory) {
        if (existingCategory.isEmpty()) {
            throw new IllegalArgumentException("Category not found");
        }
        CategoryDTO existing = existingCategory.get();
        if (categoryDTO.getName() != null) {
            existing.setName(categoryDTO.getName());
        }
        if (categoryDTO.getDescription() != null) {
            existing.setDescription(categoryDTO.getDescription());
        }
        if (categoryDTO.getParentId() != null) {
            existing.setParentId(categoryDTO.getParentId());
        }
        if (categoryDTO.getImage_url() != null) {
            existing.setImage_url(categoryDTO.getImage_url());
        }
        return existing;
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCategory(@RequestParam Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().<Void>build();
    }


}
