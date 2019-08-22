package com.tollwood.rechnungen

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity(name="ORDERED_ITEMS")
data class OrderedItems (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    val code: Code,
    val amount: Int
)
