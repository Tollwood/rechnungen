package com.tollwood.clientTemplate

import com.tollwood.jpa.Address
import com.tollwood.jpa.BaseEntity
import javax.persistence.*
import javax.persistence.GenerationType.AUTO
import javax.validation.constraints.NotNull

@Entity(name = "CLIENT_TEMPLATE")
data class ClientTemplate(
        @Id
        @GeneratedValue(strategy = AUTO)
        override val id: Long,

        @NotNull
        val name: String,

        @NotNull
        val address: Address,

        @NotNull
        val serviceCatalogId: Long

        ) : BaseEntity()