package com.tollwood.company

import CategoryServiceOrder
import com.tollwood.service.Service
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.search.annotations.Analyzer
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.SortableField
import javax.persistence.*
import javax.validation.constraints.NotNull

@Indexed
@Entity(name = "CATEGORY")
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @Field
        @SortableField
        @NotNull
        @Analyzer( impl = GermanAnalyzer::class)
        val name: String,

        @ManyToMany(mappedBy = "categories")
        val services: List<Service>,

        @NotNull
        val active: Boolean,

        @ElementCollection
        val categoryServiceOrder: List<CategoryServiceOrder>
)