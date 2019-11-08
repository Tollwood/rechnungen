package com.tollwood

import com.tollwood.jpa.Order
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param

interface OrderRepository : PagingAndSortingRepository<Order, Long> {

    fun findByOrderIdContainingOrBillNoContaining(@Param("orderId") orderId: String,@Param("billNo") billNo: String): List<Order>
    fun findByOrderId(@Param("orderId") orderId: String): List<Order>

}