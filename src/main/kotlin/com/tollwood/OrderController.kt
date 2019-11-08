package com.tollwood

import com.tollwood.jpa.Order
import com.tollwood.web.OrderResource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder
import org.springframework.web.bind.annotation.PathVariable
import javax.persistence.EntityNotFoundException

@RestController("/order")
class OrderController(@Autowired val orderRepository: OrderRepository ) {

    @GetMapping
    fun getOrders(): MutableIterable<Order> {
        return orderRepository.findAll()
    }

    @PostMapping
    fun create(@RequestBody order: Order): ResponseEntity<OrderResource> {
        val orderResource = OrderResource(orderRepository.save(order))
        val uri =
                MvcUriComponentsBuilder.fromController(this.javaClass)
                        .path("/{id}")
                        .buildAndExpand(order.id)
                        .toUri();
        return ResponseEntity.created(uri).body(orderResource);
    }


    @GetMapping("/{id}")
    fun get(@PathVariable id: Long): ResponseEntity<OrderResource> {
        return orderRepository
                .findById(id)
                .map { ResponseEntity.ok(OrderResource(it)) }
                .orElseThrow({ EntityNotFoundException("order not Found") })
    }

}