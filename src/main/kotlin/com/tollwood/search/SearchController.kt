package com.tollwood.search

import com.tollwood.OrderResource
import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.BooleanQuery
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

    @Autowired
    lateinit var orderResource: OrderResource

    @RequestMapping("/api/search")
    fun search(@RequestParam(value = "term", required = false) term: String?,
               @RequestParam(value = "status", required = false) status: List<OrderState>?):
            ResponseEntity<CollectionModel<EntityModel<Order>>> {

        if ((term == null || term.isBlank()) && (status == null || status.isEmpty())) {
            val orders = orderResource.findAll()
            return ResponseEntity(orderEntityModelAssembler.toCollectionModel(orders), HttpStatus.OK)
        }

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Order::class.java)
                .get();

        val finalQuery = BooleanQuery.Builder()
        addSearchByTerm(term, queryBuilder, finalQuery)
        addSearchByStatus(status, queryBuilder, finalQuery)

        val jpaQuery = fullTextEntityManager.createFullTextQuery(finalQuery.build(), Order::class.java)
        val results = jpaQuery.resultList as List<Order>
        return ResponseEntity(orderEntityModelAssembler.toCollectionModel(results), HttpStatus.OK)
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
                    .onFields("orderId", "name", "billNo", "realEstate.address.city", "realEstate.address.street", "realEstate.address" +
                            ".zipCode")
                    .matching(t)
                    .createQuery(), Occur.MUST)
        }
    }
}