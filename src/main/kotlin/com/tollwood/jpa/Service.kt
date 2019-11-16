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
        override val id: Long,
        @NotNull
        val articleNumber: String?,
        @NotNull
        val title: String,
        @NotNull
        val price: Double? = null,
        @NotNull
        val selectable: Boolean) : BaseEntity()