package com.tollwood.company

import CategoryServiceOrder
import com.tollwood.service.Service
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.annotations.CacheConcurrencyStrategy
import org.hibernate.search.annotations.*
import javax.persistence.*
import javax.validation.constraints.NotNull

@Indexed
@Entity(name = "CATEGORY")
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @Fields(value = [Field(name = "name_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "name", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "name")
        @NotNull
        val name: String,

        @ManyToMany(mappedBy = "categories")
        val services: List<Service>,

        @NotNull
        val active: Boolean,

        @ElementCollection
        val categoryServiceOrder: List<CategoryServiceOrder>
)