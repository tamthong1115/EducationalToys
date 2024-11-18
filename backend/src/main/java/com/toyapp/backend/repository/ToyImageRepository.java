package com.toyapp.backend.repository;

import com.toyapp.backend.model.ToyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToyImageRepository extends JpaRepository<ToyImage, Long> {
}
