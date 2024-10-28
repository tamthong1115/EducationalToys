package com.toyapp.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Data
@NoArgsConstructor
@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    @Column(name = "deleted_at")
    private Instant deletedAt;



    public Category(Long id, String name, String description, Long parentId, String image_url) {
        this.id = id;
        this.name = name;
        this.description = description;
        if (parentId != null) {
            this.parent = new Category();
            this.parent.setId(parentId);
        }
        this.image_url = image_url;
    }



    public Long getParentId() {
        return parent != null ? parent.getId() : null;
    }
}
