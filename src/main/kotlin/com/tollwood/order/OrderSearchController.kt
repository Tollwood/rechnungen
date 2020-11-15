package com.tollwood.order

import com.tollwood.order.jpa.Order
import com.tollwood.order.jpa.OrderState
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.BooleanQuery
import org.apache.lucene.search.Query
import org.apache.lucene.search.Sort
import org.apache.lucene.search.SortField
import org.hibernate.search.FullTextSession
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
class OrderSearchController {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    @Autowired
    lateinit var orderEntityModelAssembler: OrderEntityModelAssembler

    @RequestMapping("/api/orders/index")
    fun index(){
        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager)
        fullTextEntityManager.createIndexer().startAndWait()
    }

    @RequestMapping("/api/orders/search")
    fun search(@RequestParam(value = "term", required = false) term: String?,
               @RequestParam(value = "status", required = false) status: List<OrderState>?,
               @RequestParam(value = "page", defaultValue = "0", required = false) page: Int = 0,
               @RequestParam(value = "sort", required = false) sort: String?,
               @RequestParam(value = "size", defaultValue = "50", required = false) size: Int = 50,
               @Autowired pagedResourcesAssembler: PagedResourcesAssembler<Order>):
            ResponseEntity<PagedModel<EntityModel<Order>>> {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        val queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Order::class.java)
                .get();

        if ((term == null || term.isBlank()) && (status == null || status.isEmpty())) {
            val fullTextQuery = doSearch(fullTextEntityManager, queryBuilder.all().createQuery(), sort, page, size)
            return toPagedResponse(fullTextQuery, page, pagedResourcesAssembler)
        }
        val cleanTerm = term!!.replace("/","",true)

        val finalQuery = BooleanQuery.Builder()
        addSearchLikeByTerm(cleanTerm, queryBuilder, finalQuery)
        addSearchByStatus(status, queryBuilder, finalQuery)
        addStreetSearchByTerm(cleanTerm, queryBuilder, finalQuery)

        val fullTextQuery = doSearch(fullTextEntityManager, finalQuery.build(), sort, page, size)
        return toPagedResponse(fullTextQuery, page, pagedResourcesAssembler)
    }

    private fun addStreetSearchByTerm(term: String?, queryBuilder: QueryBuilder, finalQuery: BooleanQuery.Builder) {
        if (term == null || term.isBlank()) return
        finalQuery.add(queryBuilder
                .keyword()
                .fuzzy()
                .withEditDistanceUpTo(2)
                .withPrefixLength(0)
                .onFields("realEstate.address.street","realEstateAddress.street")
                .matching("${term.toLowerCase()}")
                .createQuery(), Occur.SHOULD)
    }

    private fun addSearchLikeByTerm(term: String?, queryBuilder: QueryBuilder, finalQuery: BooleanQuery.Builder) {
        if (term == null || term.isBlank()) return
            finalQuery.add(queryBuilder
                    .keyword()
                    .wildcard()
                    .onFields("billNo","orderId", "name",  "realEstate.name")
                    .matching("*${term.toLowerCase()}*")
                    .createQuery(), Occur.SHOULD)
    }

    private fun toPagedResponse(fullTextQuery: FullTextQuery, page: Int, pagedResourcesAssembler: PagedResourcesAssembler<Order>):
            ResponseEntity<PagedModel<EntityModel<Order>>> {

        val results = fullTextQuery.resultList as List<Order>
        val pageImpl = PageImpl(results, PageRequest.of(page, fullTextQuery.maxResults),
                fullTextQuery.resultSize.toLong())
        return ResponseEntity(pagedResourcesAssembler.toModel(pageImpl, orderEntityModelAssembler), HttpStatus.OK)
    }

    private fun doSearch(fullTextEntityManager: FullTextEntityManager, query: Query, sort: String?, page: Int, size: Int): FullTextQuery {
        val jpaQuery = fullTextEntityManager.createFullTextQuery(query, Order::class.java)
        addSort(jpaQuery, sort)
        jpaQuery.setFirstResult(page * size)
        jpaQuery.setMaxResults(size)
        return jpaQuery
    }

    private fun addSort(jpaQuery: FullTextQuery, sort: String?) {
        if (sort == null) return
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
                    .onFields("name",  "realEstate.address.street","realEstate.name",
                            "realEstateAddress.street")
                    .matching(t)
                    .createQuery(), Occur.SHOULD)
        }
    }
}