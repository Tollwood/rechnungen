package com.tollwood.web

import com.tollwood.jpa.Order
import org.springframework.hateoas.ResourceSupport


class OrderResource(private val order: Order) : ResourceSupport() {

    init {
        //add(linkTo(OrderController::class.java).withRel("order"))
        //add(linkTo(methodOn(OrderController::class.java).get(id)).withSelfRel())
    }
}