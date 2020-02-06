package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonBackReference
import com.tollwood.order.jpa.Order
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity(name = "SERVICE_ORDER")
data class ServiceOrder(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @NotNull
        val amount: Int,

        @ManyToOne
        val service: Service,

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    val order: Order
)
