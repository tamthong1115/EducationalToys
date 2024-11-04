package com.toyapp.backend.dto.toy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToyDTO {
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
    private Long supplierId;
}
