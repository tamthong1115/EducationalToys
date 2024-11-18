package com.toyapp.backend.dto.toy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateToyDTO {
    
    private List<MultipartFile> images;
    private Long[] categoryIds;
    private String name;
    private String description;
    private String age_range;
    private Double price;
    private Integer stock;
    private Boolean available_for_rent;
    private Boolean available_for_sale;
    private String manufacturer;
    private Double weight;
    private String material;
}
