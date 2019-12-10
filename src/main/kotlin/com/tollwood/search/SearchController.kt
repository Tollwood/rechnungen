package com.tollwood.search

import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
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
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.EntityModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@RestController
class SearchController {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    @Autowired
    lateinit var orderEntityModelAssembler: OrderEntityModelAssembler

    @RequestMapping("/api/search")
    fun search(@RequestParam(value = "term", required = false) term: String?,
               @RequestParam(value = "status", required = false) status: List<OrderState>?,
               @RequestParam(value = "page", defaultValue = "0", required = false) page: Int = 0,
               @RequestParam(value = "sort", required = false) sort: String?,
               @RequestParam(value = "size", defaultValue = "20", required = false) size: Int = 20):
            ResponseEntity<CollectionModel<EntityModel<Order>>> {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Order::class.java)
                .get();

        if ((term == null || term.isBlank()) && (status == null || status.isEmpty())) {
            val results = doSearch(fullTextEntityManager,queryBuilder.all().createQuery(),sort,page,size)
            return ResponseEntity(orderEntityModelAssembler.toCollectionModel(results), HttpStatus.OK)
        }

        val finalQuery = BooleanQuery.Builder()
        addSearchByTerm(term, queryBuilder, finalQuery)
        addSearchByStatus(status, queryBuilder, finalQuery)

        val results = doSearch(fullTextEntityManager, finalQuery.build(), sort, page, size)
        return ResponseEntity(orderEntityModelAssembler.toCollectionModel(results), HttpStatus.OK)
    }

    private fun doSearch(fullTextEntityManager: FullTextEntityManager, query: Query, sort: String?, page: Int, size: Int): List<Order> {
        val jpaQuery = fullTextEntityManager.createFullTextQuery(query, Order::class.java)
        addSort(jpaQuery, sort)
        jpaQuery.setFirstResult(page * size)
        jpaQuery.setMaxResults(size)
        val results = jpaQuery.resultList as List<Order>
        return results
    }

    private fun addSort( jpaQuery: FullTextQuery, sort: String?) {
        if(sort == null) return
        val sortValues = sort.split(",")
        val reverse = sortValues.size == 2 && sortValues[1].equals("desc")
        jpaQuery.setSort(Sort(SortField(sortValues[0], SortField.Type.STRING, reverse)))
    }

    private fun addSearchByStatus(status: List<OrderState>?, queryBuilder: QueryBuilder, finalQuery: BooleanQuery.Builder) {
        if (status != null && status.isNotEmpty()) {
            val statusQuery = BooleanQuery.Builder()
            for (st in status) {
                val stQuery = queryBuilder
                        .keyword()
                        .onField("status")
                        .matching(st)
                        .createQuery()
                statusQuery.add(stQuery, Occur.SHOULD)
            }
            finalQuery.add(statusQuery.build(), Occur.FILTER)
        }
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
                    .onFields("orderId", "name", "billNo", "realEstate.address.city", "realEstate.address.street", "realEstate.address.zipCode")
                    .matching(t)
                    .createQuery(), Occur.MUST)
        }
    }
}