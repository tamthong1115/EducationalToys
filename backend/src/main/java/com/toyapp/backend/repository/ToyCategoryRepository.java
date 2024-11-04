package com.toyapp.backend.repository;

import com.toyapp.backend.model.Category;
import com.toyapp.backend.model.Toy;
import com.toyapp.backend.model.ToyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToyCategoryRepository  extends JpaRepository<ToyCategory, Long> {
    boolean existsByToyAndCategory(Toy toy, Category category);
}
