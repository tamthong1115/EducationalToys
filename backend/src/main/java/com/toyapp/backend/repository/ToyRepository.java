package com.toyapp.backend.repository;

import com.toyapp.backend.model.Category;
import com.toyapp.backend.model.Toy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToyRepository extends JpaRepository<Toy, Long> {
    @Query("SELECT t FROM Toy t WHERE t.name LIKE %:query% OR t.description LIKE %:query%")
    Page<Toy> searchByNameOrDescription(@Param("query") String query, Pageable pageable);

//    @Query("SELECT t FROM Toy t WHERE t.name LIKE %:query% OR t.description LIKE %:query% AND t.categories IN :categories")
//    Page<Toy> searchByNameOrDescriptionAndCategories(@Param("query") String query, List<Category> categories, Pageable pageable);
}
