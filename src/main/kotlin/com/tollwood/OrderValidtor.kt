package com.tollwood

import com.tollwood.jpa.Order
import com.tollwood.validation.ValidationErrors
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator


@Component("beforeSaveOrderValidtor")
class BeforeSaveOrderValidtor(@Autowired orderResource: OrderResource) : OrderValidtor(orderResource)


@Component("beforeCreateOrderValidtor")
class BeforeCreateOrderValidtor(@Autowired orderResource: OrderResource) : OrderValidtor(orderResource)

open class OrderValidtor(@Autowired val serviceResource: OrderResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return Order::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val order = obj as Order
        notEmpty(order.orderId, "orderId", errors);
        ValidationErrors.alreadyExists(serviceResource.findByOrderId(order.orderId), order.id,"orderId", errors)
        notEmpty(order.realEstate, "realEstate", errors)
        notEmpty(order.technician, "technician", errors)
    }
}