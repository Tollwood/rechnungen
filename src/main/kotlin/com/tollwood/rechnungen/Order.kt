package com.tollwood.rechnungen

import java.util.*
import javax.persistence.*

@Entity(name="ORDERS")
data class Order(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        val recievedAt: Date,
        @OneToOne
        val orderDetails: OrderDetails,
        @OneToMany
        val items: List<OrderedItems>

)