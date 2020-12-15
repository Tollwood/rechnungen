package com.tollwood.service

import com.tollwood.jpa.BaseEntity
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.search.annotations.Analyzer
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.SortableField
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.AUTO
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Indexed
@Entity(name = "SERVICE")
data class Service(
        @Id
        @GeneratedValue(strategy = AUTO)
        override val id: Long,
        val serviceCatalogId: Long,
        @Field
        @SortableField
        @NotNull
        @Analyzer( impl = GermanAnalyzer::class)
        val articleNumber: String?,
        @Field
        @SortableField
        @NotNull
        @Analyzer( impl = GermanAnalyzer::class)
        val title: String,
        @NotNull
        @Field
        @SortableField
        val price: Double? = null,
        @NotNull
        val selectable: Boolean) : BaseEntity()