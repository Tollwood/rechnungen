package com.tollwood.realestate

import com.tollwood.realestate.jpa.RealEstate
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.BooleanQuery
import org.apache.lucene.search.Query
import org.apache.lucene.search.Sort
import org.apache.lucene.search.SortField
import org.hibernate.search.jpa.FullTextEntityManager
import org.hibernate.search.jpa.FullTextQuery
import org.hibernate.search.jpa.Search
import org.hibernate.search.query.dsl.QueryBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.web.PagedResourcesAssembler
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.PagedModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@RestController
class RealEstateSearchController {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    @Autowired
    lateinit var realEstateEntityModelAssembler: RealEstateEntityModelAssembler

    @RequestMapping("/api/realestates/search")
    fun search(@RequestParam(value = "term", required = false) term: String?,
               @RequestParam(value = "page", defaultValue = "0", required = false) page: Int = 0,
               @RequestParam(value = "sort", required = false) sort: String?,
               @RequestParam(value = "size", defaultValue = "50", required = false) size: Int = 50,
               @Autowired pagedResourcesAssembler: PagedResourcesAssembler<RealEstate>):
            ResponseEntity<PagedModel<EntityModel<RealEstate>>> {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(RealEstate::class.java)
                .get();

        if ((term == null || term.isBlank())) {
            val fullTextQuery = doSearch(fullTextEntityManager, queryBuilder.all().createQuery(), sort, page, size)
            return toPagedResponse(fullTextQuery, page, pagedResourcesAssembler)
        }

        val finalQuery = BooleanQuery.Builder()
        addSearchByTerm(term, queryBuilder, finalQuery)

        val fullTextQuery = doSearch(fullTextEntityManager, finalQuery.build(), sort, page, size)
        return toPagedResponse(fullTextQuery, page, pagedResourcesAssembler)
    }

    private fun toPagedResponse(fullTextQuery: FullTextQuery, page: Int,pagedResourcesAssembler: PagedResourcesAssembler<RealEstate>):
            ResponseEntity<PagedModel<EntityModel<RealEstate>>> {

        val results = fullTextQuery.resultList  as List<RealEstate>
        val pageImpl = PageImpl(results, PageRequest.of(page, fullTextQuery.maxResults),
                fullTextQuery.resultSize.toLong())
        return ResponseEntity(pagedResourcesAssembler.toModel(pageImpl, realEstateEntityModelAssembler), HttpStatus.OK)
    }

    private fun doSearch(fullTextEntityManager: FullTextEntityManager, query: Query, sort: String?, page: Int, size: Int): FullTextQuery {
        val jpaQuery = fullTextEntityManager.createFullTextQuery(query, RealEstate::class.java)
        addSort(jpaQuery, sort)
        jpaQuery.setFirstResult(page * size)
        jpaQuery.setMaxResults(size)
        return jpaQuery
    }

    private fun addSort(jpaQuery: FullTextQuery, sort: String?) {
        if (sort == null) return
        val sortValues = sort.split(",")
        val reverse = sortValues.size == 2 && sortValues[1].equals("desc")
        var sortFieldType = SortField.Type.STRING
        if(sortValues[0] == "distance") {
            sortFieldType = SortField.Type.INT
        }

         jpaQuery.setSort(Sort(SortField(sortValues[0], sortFieldType, reverse)))
    }

    private fun addSearchByTerm(term: String?, queryBuilder: QueryBuilder, finalQuery: BooleanQuery.Builder) {
        if (term == null) return
        val terms = term.split(" ")
        for (t in terms) {
            if (t.isBlank()) continue
            finalQuery.add(queryBuilder
                    .keyword()
                    .fuzzy()
                    .withEditDistanceUpTo(2)
                    .withPrefixLength(0)
                    .onFields("name", "address.city", "address.street",
                            "address.zipCode")
                    .matching(t)
                    .createQuery(), Occur.MUST)
        }
    }
}