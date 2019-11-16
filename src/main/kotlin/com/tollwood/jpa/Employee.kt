package com.tollwood.jpa

import org.jetbrains.annotations.NotNull
import javax.persistence.*


@Entity(name = "EMPLOYEE")
data class Employee(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        override val id: Long,
        val firstName: String,
        val lastName: String,
        @Embedded
        val address: Address,
        val taxIdent: String,
        @NotNull
        val technicianId: String?,

        @NotNull
        val email: String,
        @NotNull
        val phone: String,
        @Embedded
        val bankDetails: BankDetails
) : BaseEntity()