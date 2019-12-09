package com.tollwood.jpa

import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.SortableField
import javax.persistence.Embeddable

@Embeddable
data class Address (
        @Field
        @SortableField
        val street: String,
        val houseNumber: String,
        @Field
        @SortableField
        val zipCode: String,
        @Field
        @SortableField
        val city: String
)