package com.tollwood.jpa

import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity(name="REAL_ESTATE")
data class RealEstate (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @Column(unique = true, nullable = false)
        val name: String?,

        @Embedded
        val address: Address,

        @NotNull
        val distance: Int
):BaseEntity()
