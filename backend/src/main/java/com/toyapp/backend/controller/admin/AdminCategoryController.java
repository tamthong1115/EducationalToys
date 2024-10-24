package com.toyapp.backend.controller.admin;

import com.toyapp.backend.dto.category.CategoryDTO;
import com.toyapp.backend.dto.category.CreateCategoryDTO;
import com.toyapp.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/category")
public class AdminCategoryController extends BaseAdminController {

    private final CategoryService categoryService;

    public AdminCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CreateCategoryDTO createCategoryDTO) {
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
