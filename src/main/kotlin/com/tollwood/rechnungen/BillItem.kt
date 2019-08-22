package com.tollwood.rechnungen

import javax.persistence.*

@Entity(name="BILL_ITEM")
data class BillItem(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        @ManyToOne
        val article: Article,
        val amount: Int)