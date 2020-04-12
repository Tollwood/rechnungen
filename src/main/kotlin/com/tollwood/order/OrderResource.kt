package com.tollwood.order

import com.tollwood.order.jpa.Order
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.PathVariable
import java.util.*

@RepositoryRestResource(collectionResourceRel = "order", path = "order")
interface OrderResource : PagingAndSortingRepository<Order, Long> {

    fun findByOrderIdContainingOrBillNoContaining(@Param("orderId") orderId: String,@Param("billNo") billNo: String): List<Order>
    fun findByOrderId(@Param("orderId") orderId: String?): Optional<Order>
    fun findByBillNo(@Param("billNo") billNo: String?): Optional<Order>
    fun findById(@PathVariable("id") id: Long?): Order
}