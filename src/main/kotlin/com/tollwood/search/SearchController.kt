package com.tollwood.search

import com.tollwood.OrderResource
import com.tollwood.jpa.Order
import org.apache.lucene.search.Query
import org.hibernate.search.jpa.Search
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
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.BooleanQuery

@RestController
class SearchController {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    @Autowired
    lateinit var orderEntityModelAssembler: OrderEntityModelAssembler

    @Autowired
    lateinit var orderResource: OrderResource

    @RequestMapping("/api/search")
    fun search(@RequestParam(value = "term") term: String): ResponseEntity<CollectionModel<EntityModel<Order>>> {

        if (term.isBlank()) {
            val orders = orderResource.findAll()
            return ResponseEntity(orderEntityModelAssembler.toCollectionModel(orders), HttpStatus.OK)
        }

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Order::class.java)
                .get();

        val terms = term.split(" ")

        val queries = ArrayList<Query>()

        for(t in terms){
            queries.add(queryBuilder
                    .keyword()
                    .fuzzy()
                    .withEditDistanceUpTo(2)
                    .withPrefixLength(0)
                    .onFields("orderId", "billNo", "realEstate.address.city", "realEstate.address.street", "realEstate.address.zipCode")
                    .matching(t)
                    .createQuery())
        }

        val finalQuery = BooleanQuery.Builder()
        for(query in queries){
            finalQuery.add(query, Occur.MUST)
        }

        val jpaQuery = fullTextEntityManager.createFullTextQuery(finalQuery.build(), Order::class.java)
        val results = jpaQuery.resultList as List<Order>
        return ResponseEntity(orderEntityModelAssembler.toCollectionModel(results), HttpStatus.OK)
    }
}