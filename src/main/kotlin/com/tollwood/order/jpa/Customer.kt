package com.tollwood.jpa

import org.hibernate.search.annotations.*
import javax.persistence.Embeddable

@Embeddable
data class Customer (
        val salutation: String,
        @Fields(value = [Field(name = "firstName_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
            Field(name = "firstName", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "firstName")
        val firstName: String,

        @Fields(value = [Field(name = "lastName_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
            Field(name = "lastName", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "lastName")
        val lastName: String,
        val phoneNumber: String,
        val address: Address
)