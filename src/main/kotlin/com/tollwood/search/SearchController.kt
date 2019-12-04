package com.tollwood.search

import com.tollwood.jpa.Employee
import com.tollwood.jpa.Order
import com.tollwood.jpa.RealEstate
import org.hibernate.search.jpa.Search
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
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
    fun search(@RequestParam(value="term") term: String): ResponseEntity<CollectionModel<EntityModel<Order>>> {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Order::class.java)
                .get();

        val query = queryBuilder
                .keyword()
                .fuzzy()
                .withEditDistanceUpTo(2)
                .withPrefixLength(0)
                .onFields("orderId", "billNo", "realEstate.address.city","realEstate.address.street","realEstate.address.zipCode")
                .matching(term)
                .createQuery()

        val jpaQuery = fullTextEntityManager.createFullTextQuery(query, Order::class.java)
        val results = jpaQuery.resultList as List<Order>
        return ResponseEntity(orderEntityModelAssembler.toCollectionModel(results), HttpStatus.OK);
    }
}