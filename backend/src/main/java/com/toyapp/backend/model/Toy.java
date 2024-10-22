package com.toyapp.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Entity
@Table(name="toys")
public class Toy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String name;

    @Column()
    private String description;

    @Column()
    private String age_range;

    @Column(nullable = false)
    private Double price;


    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Boolean available_for_rent = false;

    @Column(nullable = false)
    private Boolean available_for_sale = true;

    @Column()
    private String manufacturer;

    @Column()
    private Double weight;

    @Column()
    private String material;

    @OneToMany(mappedBy = "toy", cascade = CascadeType.ALL)
    private List<ToyImage> images;


    @Column(name = "rental_price_day", precision = 10, scale = 2)
    private BigDecimal rentalPriceDay;

    @Column(name = "rental_price_week", precision = 10, scale = 2)
    private BigDecimal rentalPriceWeek;

    @Column(name = "rental_price_two_weeks", precision = 10, scale = 2)
    private BigDecimal rentalPriceTwoWeeks;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private User supplier;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;


}
