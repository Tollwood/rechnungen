package com.tollwood

import com.tollwood.jpa.Order
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "order", path = "order")
interface OrderResource : PagingAndSortingRepository<Order, Long> {

    fun findByOrderIdContainingOrBillNoContaining(@Param("orderId") orderId: String,@Param("billNo") billNo: String): List<Order>
    fun findByOrderId(@Param("orderId") orderId: String): List<Order>

}