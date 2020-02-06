package com.tollwood.order.jpa

import com.tollwood.order.OrderResource
import com.tollwood.order.jpa.OrderState.*
import com.tollwood.validation.ValidationErrors.Companion.alreadyExists
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import com.tollwood.validation.ValidationErrors.Companion.notNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator


@Component("beforeSaveOrderValidtor")
class BeforeSaveOrderValidtor(@Autowired orderResource: OrderResource) : OrderValidtor(orderResource)


@Component("beforeCreateOrderValidtor")
class BeforeCreateOrderValidtor(@Autowired orderResource: OrderResource) : OrderValidtor(orderResource)

open class OrderValidtor(@Autowired val orderResource: OrderResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return Order::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val order = obj as Order
        notEmpty(order.orderId, "orderId", errors);
        alreadyExists(orderResource.findByOrderId(order.orderId), order.id, "orderId", order.orderId,errors)
        notEmpty(order.realEstate, "realEstate", errors)
        notEmpty(order.technician, "technician", errors)

        if (shouldValidate(ORDER_EXECUTE, order)) {
            notEmpty(order.firstAppointment, "firstAppointment", errors)
            notNull(order.distance, "distance", errors)
        }

        if (shouldValidate(ORDER_BILL, order)) {
            notEmpty(order.billNo, "billNo", errors)
            notDefault(order.billNo, "billNo", errors)
            notEmpty(order.billDate, "billDate", errors)
        }
        if(order.billNo != null && !"".equals(order.billNo)){
            alreadyExists(orderResource.findByBillNo(order.billNo), order.id, "billNo", order.billNo, errors)
        }

        if (shouldValidate(ORDER_BILL_RECIEVED, order)) {
            notEmpty(order.paymentRecievedDate, "paymentRecievedDate", errors)
        }
    }

    private fun shouldValidate(stateToValidate: OrderState, order: Order): Boolean {
        val orderStatus = order.prevStatus?: order.status;
        return stateToValidate.order <= orderStatus.order
    }

    fun notDefault(input: String?, field: String, errors: Errors) {
        if (input != null && input.startsWith("R") && input.endsWith('-')) {
            errors.rejectValue(field, "noDefaultValue", "ungültiger Wert")
        }

    }
}