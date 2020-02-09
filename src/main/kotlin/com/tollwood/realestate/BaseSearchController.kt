package com.tollwood.realestate

import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.BooleanQuery
import org.apache.lucene.search.Query
import org.apache.lucene.search.Sort
import org.apache.lucene.search.SortField
import org.hibernate.search.jpa.FullTextEntityManager
import org.hibernate.search.jpa.FullTextQuery
import org.hibernate.search.jpa.Search
import org.hibernate.search.query.dsl.QueryBuilder
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.web.PagedResourcesAssembler
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.PagedModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@RestController
abstract class BaseSearchController<K> {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    fun search(term: String?,
               page: Int = 0,
               sort: String?,
               size: Int = 50,
               pagedResourcesAssembler: PagedResourcesAssembler<K>): ResponseEntity<PagedModel<EntityModel<K>>> {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(getCurrentClass())
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


    private fun toPagedResponse(fullTextQuery: FullTextQuery, page: Int, pagedResourcesAssembler: PagedResourcesAssembler<K>):
            ResponseEntity<PagedModel<EntityModel<K>>> {

        val results = fullTextQuery.resultList as List<K>
        val pageImpl = PageImpl(results, PageRequest.of(page, fullTextQuery.maxResults),
                fullTextQuery.resultSize.toLong())
        return ResponseEntity(pagedResourcesAssembler.toModel(pageImpl, getModelAssembler()), HttpStatus.OK)
    }

    private fun doSearch(fullTextEntityManager: FullTextEntityManager, query: Query, sort: String?, page: Int, size: Int): FullTextQuery {
        val jpaQuery = fullTextEntityManager.createFullTextQuery(query, getCurrentClass())
        addSort(jpaQuery, sort)
        jpaQuery.setFirstResult(page * size)
        jpaQuery.setMaxResults(size)
        return jpaQuery
    }

    private fun addSort(jpaQuery: FullTextQuery, sort: String?) {
        if (sort == null) return
        val sortValues = sort.split(",")
        val reverse = sortValues.size == 2 && sortValues[1].equals("desc")

        jpaQuery.setSort(Sort(SortField(sortValues[0], getSortFieldType(sortValues[0]), reverse)))
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
                    .onFields(*getSearchFields().toTypedArray())
                    .matching(t)
                    .createQuery(), Occur.MUST)
        }
    }

    protected abstract fun getModelAssembler(): RepresentationModelAssembler<K, EntityModel<K>>

    protected abstract fun getCurrentClass(): Class<K>

    protected abstract fun getSearchFields(): List<String>

    protected abstract fun getSortFieldType(sortField: String): SortField.Type
}