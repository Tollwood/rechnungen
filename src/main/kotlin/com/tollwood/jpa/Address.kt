package com.tollwood.jpa

import org.hibernate.search.annotations.*
import javax.persistence.Embeddable

@Embeddable
data class Address (
        @Fields(value = [Field(name = "street_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "street", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "street")
        val street: String,

        val houseNumber: String,
        @Fields(value = [Field(name = "zipCode_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "zipCode", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "zipCode")
        val zipCode: String,
        @Fields(value = [Field(name = "city_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "city", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "city")
        val city: String
)