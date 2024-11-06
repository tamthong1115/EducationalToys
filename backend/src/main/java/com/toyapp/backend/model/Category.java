package com.toyapp.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    public Category(Long id, String name, String description, Long parentId) {
        this.id = id;
        this.name = name;
        this.description = description;
        if (parentId != null) {
            this.parent = new Category();
            this.parent.setId(parentId);
        }
        this.createdAt = Instant.now(); // Cập nhật giá trị createdAt
        this.updatedAt = Instant.now(); // Cập nhật giá trị updatedAt
    }

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    public Long getParentId() {
        return parent != null ? parent.getId() : null;
    }
}
