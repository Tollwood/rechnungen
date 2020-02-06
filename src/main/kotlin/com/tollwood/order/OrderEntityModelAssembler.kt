package com.tollwood.order

import com.tollwood.jpa.Employee
import com.tollwood.order.jpa.Order
import com.tollwood.realestate.jpa.RealEstate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class OrderEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<Order,
        EntityModel<Order>> {
    override fun toModel(order: Order): EntityModel<Order> =
            EntityModel(order,
                    repositoryEntityLinks.linkForItemResource(Order::class.java, order.id as Any).withSelfRel(),
                    repositoryEntityLinks.linkForItemResource(RealEstate::class.java, order.realEstate!!.id as Any).withRel("realEstate"),
                    repositoryEntityLinks.linkForItemResource(Employee::class.java, order.technician!!.id as Any).withRel("technician"))
}