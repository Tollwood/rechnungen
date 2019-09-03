package com.tollwood.jpa

import javax.persistence.Embeddable

@Embeddable
data class Address (
        val street: String,
        val houseNumber: String,
        val zipCode: String,
        val city: String
)