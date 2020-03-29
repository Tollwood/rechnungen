package com.tollwood.jpa

import javax.persistence.Embeddable

@Embeddable
data class Customer (
        val salutation: String,
        val firstName: String,
        val lastName: String,
        val phoneNumber: String,
        val address: Address
)