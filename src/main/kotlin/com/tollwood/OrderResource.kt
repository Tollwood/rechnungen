package com.tollwood

import com.tollwood.jpa.Order
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "order", path = "order")
interface OrderResource: PagingAndSortingRepository<Order, Long> {

}