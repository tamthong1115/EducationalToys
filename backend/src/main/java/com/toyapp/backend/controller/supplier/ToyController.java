package com.toyapp.backend.controller.supplier;

import com.toyapp.backend.dto.toy.CreateToyDTO;
import com.toyapp.backend.dto.toy.ToyResponseDTO;
import com.toyapp.backend.service.ToyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier/toy")
public class ToyController {
    private final ToyService toyService;
    
    public ToyController(ToyService toyService) {
        this.toyService = toyService;
    }

    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public ResponseEntity<ToyResponseDTO> createToy(
            @ModelAttribute CreateToyDTO createToyDTO,
            @RequestParam("images") List<MultipartFile> images) {
        createToyDTO.setImages(images);
        ToyResponseDTO toyResponseDTO = toyService.createToy(createToyDTO);
        return new ResponseEntity<>(toyResponseDTO, HttpStatus.CREATED);
    }
}
