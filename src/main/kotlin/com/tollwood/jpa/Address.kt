package com.tollwood.jpa

import org.hibernate.search.annotations.Field
import javax.persistence.Embeddable

@Embeddable
data class Address (
        @Field
        val street: String,
        val houseNumber: String,
        @Field
        val zipCode: String,
        @Field
        val city: String
)