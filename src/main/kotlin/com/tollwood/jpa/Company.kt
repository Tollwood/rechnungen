package com.tollwood.jpa

import javax.persistence.*

@Entity(name = "COMPANY")
data class Company(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        val billNo: Long = 0,
        val name: String,
        val logo: String,
        @Embedded
        val address: Address,
        val phone: String,
        val email: String
)