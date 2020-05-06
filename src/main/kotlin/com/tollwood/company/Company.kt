package com.tollwood.company

import com.tollwood.jpa.Address
import org.hibernate.annotations.CacheConcurrencyStrategy
import javax.persistence.*

@Entity(name = "COMPANY")
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
data class Company(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        var billNo: Long = 0,
        val name: String,
        val shortName: String,
        var logo: String,
        var thankYouImage: String?,
        @Embedded
        val address: Address,
        val phone: String,
        val email: String,
        val realEstateSupport: Boolean,
        val employeeSupport: Boolean,
        val billingSupport: Boolean,
        val customerSupport: Boolean,
        val publicOrder: Boolean,
        val homeHeader: String,
        val homeFooter: String
)