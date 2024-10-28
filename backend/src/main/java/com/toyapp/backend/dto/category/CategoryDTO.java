package com.toyapp.backend.dto.category;

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
        private String image_url;

        public CategoryDTO(String name) {
            this.name = name;
        }


}
