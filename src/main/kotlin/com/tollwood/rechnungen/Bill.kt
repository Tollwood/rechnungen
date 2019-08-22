package com.tollwood.rechnungen

import java.util.*
import javax.persistence.*


@Entity(name="BILL")
data class Bill(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @ManyToOne
        val employee: Employee,
        val billNumber:String,

        @OneToMany
        val items: List<BillItem>,

        @OneToOne
        val orderDetails: OrderDetails,
        val date: Date)

