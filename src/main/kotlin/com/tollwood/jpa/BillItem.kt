package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*
import javax.persistence.GenerationType.AUTO
import javax.validation.constraints.NotNull

@Entity(name = "BiLL_ITEM")
data class BillItem(
        @Id
        @GeneratedValue(strategy = AUTO)
        val id: Long? = null,
        @NotNull
        val code: String,
        @NotNull
        val serviceName: String,
        @NotNull
        val price: Double,
        @NotNull
        val amount: Int,

        @NotNull
        @JsonBackReference
        @ManyToOne
        @JoinColumn(name = "order_id")
        val order: Order
)