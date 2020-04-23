package com.tollwood.service

import com.fasterxml.jackson.annotation.JsonBackReference
import com.tollwood.company.Category
import com.tollwood.jpa.BaseEntity
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.search.annotations.Analyzer
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.SortableField
import org.springframework.data.rest.core.annotation.RestResource
import javax.persistence.*
import javax.persistence.GenerationType.AUTO
import javax.validation.constraints.NotNull

@Indexed
@Entity(name = "SERVICE")
data class Service(
        @Id
        @GeneratedValue(strategy = AUTO)
        override val id: Long,

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
        val description: String?,
        @NotNull
        @Field
        @SortableField
        val price: Double? = null,

        var image: String? = "",

        @ManyToMany
        @JoinTable(name = "service_category",
                joinColumns = [JoinColumn(name = "service_id", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "category_id",
                        referencedColumnName = "id")])
        @RestResource
        @JsonBackReference
        val categories: List<Category>,

        @NotNull
        val selectable: Boolean) : BaseEntity()