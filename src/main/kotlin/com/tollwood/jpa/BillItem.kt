package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonProperty
import com.tollwood.order.jpa.Order
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
) {
    @JsonProperty(value ="code")
    fun getCode(): String {
        return id.code
    }
}


@Embeddable
data class DependentId(
        @NotNull
        val code: String,
        val orderId: Long?
) : Serializable