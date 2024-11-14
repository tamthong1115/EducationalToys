
package com.toyapp.backend.controller;

import com.toyapp.backend.dto.toy.ToyResponseDTO;
import com.toyapp.backend.service.ToyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/toy")
public class ToyController {
    private final ToyService toyService;

    public ToyController(ToyService toyService) {
        this.toyService = toyService;
    }

    @GetMapping
    public ResponseEntity<ToyResponseDTO> getToyById(@RequestParam Long id) {
        ToyResponseDTO toyResponseDTO = toyService.getToyById(id);
        return new ResponseEntity<>(toyResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ToyResponseDTO>> getAllToys() {
        List<ToyResponseDTO> toys = toyService.getAllToys();
        return new ResponseEntity<>(toys, HttpStatus.OK);
    }
}