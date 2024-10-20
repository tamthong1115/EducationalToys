package com.toyapp.backend.dto;

import com.toyapp.backend.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

        private Long id;
        private String name;
        private String description;
        private Long parentId;

        public CategoryDTO(String name) {
            this.name = name;
        }


}
