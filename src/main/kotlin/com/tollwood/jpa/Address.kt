package com.tollwood.jpa

import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.search.annotations.Analyzer
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.SortableField
import javax.persistence.Embeddable

@Embeddable
data class Address (
        @Field
        @SortableField
        @Analyzer( impl = GermanAnalyzer::class)
        val street: String,

        val houseNumber: String,
        @Field
        @SortableField
        val zipCode: String,
        @Field
        @SortableField
        @Analyzer( impl = GermanAnalyzer::class)
        val city: String
)