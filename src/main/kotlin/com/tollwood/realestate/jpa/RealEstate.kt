package com.tollwood.realestate.jpa

import com.tollwood.jpa.Address
import com.tollwood.jpa.BaseEntity
import org.apache.lucene.analysis.de.GermanAnalyzer
import org.hibernate.search.annotations.*
import javax.persistence.*
import javax.validation.constraints.NotNull

@Indexed
@Entity(name="REAL_ESTATE")
data class RealEstate (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        override val id: Long? = null,

        @Field
        @SortableField
        @Column(unique = true, nullable = false)
        @Analyzer( impl = GermanAnalyzer::class)
        val name: String?,

        @Embedded
        @IndexedEmbedded
        val address: Address,

        @Field
        @SortableField
        @NotNull
        val distance: Int
): BaseEntity()
