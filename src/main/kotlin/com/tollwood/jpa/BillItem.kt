package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonBackReference
import java.io.Serializable
import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity(name = "BiLL_ITEM")
data class BillItem(

        @EmbeddedId val id: DependentId,

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
        @MapsId("orderId")
        val order: Order
)


@Embeddable
class DependentId(
        @NotNull
        val code: String,
        val orderId: Long?
): Serializable