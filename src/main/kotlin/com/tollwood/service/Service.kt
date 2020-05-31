package com.tollwood.service

import com.fasterxml.jackson.annotation.JsonBackReference
import com.tollwood.company.Category
import com.tollwood.jpa.BaseEntity
import org.apache.lucene.analysis.core.LowerCaseFilterFactory
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.apache.lucene.analysis.miscellaneous.ASCIIFoldingFilterFactory
import org.apache.lucene.analysis.standard.StandardTokenizerFactory
import org.hibernate.annotations.CacheConcurrencyStrategy
import org.hibernate.search.annotations.*
import org.springframework.data.rest.core.annotation.RestResource
import javax.persistence.*
import javax.persistence.GenerationType.AUTO
import javax.validation.constraints.NotNull

@Indexed
@Entity(name = "SERVICE")
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@AnalyzerDef(name = "de", tokenizer = TokenizerDef(factory = StandardTokenizerFactory::class),
        filters = [
                TokenFilterDef(factory = LowerCaseFilterFactory::class),
                TokenFilterDef(factory = ASCIIFoldingFilterFactory::class)]
)
@NormalizerDef(name = "lowercase", filters = [
        TokenFilterDef(factory = ASCIIFoldingFilterFactory::class),
        TokenFilterDef(factory = LowerCaseFilterFactory::class)
]
)
data class Service(
        @Id
        @GeneratedValue(strategy = AUTO)
        override val id: Long,

        @Fields(value = [Field(name = "articleNumber_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "articleNumber", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "articleNumber")
        @NotNull
        val articleNumber: String?,

        @Fields(value = [Field(name = "title_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
        Field(name = "title", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "title")
        @NotNull
        val title: String,
        @NotNull
        val description: String?,
        @NotNull
        @Fields(value = [Field(name = "price_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "price", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "price")
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