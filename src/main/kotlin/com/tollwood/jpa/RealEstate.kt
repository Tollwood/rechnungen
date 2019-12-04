package com.tollwood.jpa

import org.hibernate.search.annotations.IndexedEmbedded
import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity(name="REAL_ESTATE")
data class RealEstate (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        override val id: Long? = null,

        @Column(unique = true, nullable = false)
        val name: String?,

        @Embedded
        @IndexedEmbedded
        val address: Address,

        @NotNull
        val distance: Int
):BaseEntity()
