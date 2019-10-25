package com.tollwood.jpa

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.AUTO
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Entity(name = "SERVICE")
data class Service(
        @Id
        @GeneratedValue(strategy = AUTO)
        val id: Long,
        @NotNull
        val articleNumber: String,
        @NotNull
        val title: String,
        @NotNull
        val price: Double,
        @NotNull
        val selectable: Boolean) : BaseEntity()