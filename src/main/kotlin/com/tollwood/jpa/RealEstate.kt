package com.tollwood.jpa

import javax.persistence.*

@Entity(name="REAL_ESTATE")
data class RealEstate (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @Column(unique = true)
        val name: String,

        @Embedded
        val address: Address

        //@OneToMany
        //val instrumentation: List<Instrumentation>
)