package com.tollwood.company

import com.tollwood.jpa.Address
import javax.persistence.*

@Entity(name = "COMPANY")
data class Company(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        var billNo: Long = 0,
        val name: String,
        val shortName: String,
        val logo: String,
        val thankYouImage: String?,
        @Embedded
        val address: Address,
        val phone: String,
        val email: String,
        val realEstateSupport: Boolean,
        val employeeSupport: Boolean,
        val billingSupport: Boolean,
        val customerSupport: Boolean
)