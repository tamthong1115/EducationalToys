package com.toyapp.backend.controller.admin;

import com.toyapp.backend.dto.category.CategoryDTO;
import com.toyapp.backend.dto.category.CreateCategoryDTO;
import com.toyapp.backend.service.CategoryService;
import com.toyapp.backend.service.CloudinaryService;
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

    @DeleteMapping
    public ResponseEntity<Void> deleteCategory(@RequestParam Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }


}
