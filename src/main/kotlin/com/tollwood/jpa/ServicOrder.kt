package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity(name="SERVICE_ORDER")
data class ServiceOrder (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @NotNull
    val amount: Int,
    @ManyToOne
    val service: Service,

    @JsonBackReference
    @ManyToOne
    val order: Order
)
