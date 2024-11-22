package com.toyapp.backend.repository;

import com.toyapp.backend.model.Category;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @NotNull
    @Override
    Optional<Category> findById(@NotNull Long aLong);

    List<Category> findByNameIn(List<String> categoryNames);
}
