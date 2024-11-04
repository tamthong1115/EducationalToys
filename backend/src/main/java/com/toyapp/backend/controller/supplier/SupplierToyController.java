package com.toyapp.backend.controller.supplier;

import com.toyapp.backend.dto.toy.CreateToyDTO;
import com.toyapp.backend.dto.toy.ToyResponseDTO;
import com.toyapp.backend.service.ToyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier/toy")
public class SupplierToyController {
    private final ToyService toyService;
    
    public SupplierToyController(ToyService toyService) {
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
    
    @PutMapping
    public ResponseEntity<ToyResponseDTO> updateToy(
            @RequestParam Long id,
            @ModelAttribute CreateToyDTO createToyDTO,
            @RequestParam("images") List<MultipartFile> images) {
        createToyDTO.setImages(images);
        ToyResponseDTO toyResponseDTO = toyService.updateToy(id, createToyDTO);
        return new ResponseEntity<>(toyResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteToy(@RequestParam Long id) {
        toyService.deleteToy(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    
}
