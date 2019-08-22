package com.tollwood.rechnungen

import javax.persistence.*

@Entity(name="EMPLOYEE")
data class Employee(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        val employeeNo: String,
        val firstName: String,
        val lastName: String,
        @Embedded
        val address: Address,
        val phone: String,
        val email: String,
        val taxNo: String
)