package com.tollwood

import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
import com.tollwood.jpa.OrderState.*
import com.tollwood.validation.ValidationErrors.Companion.alreadyExists
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator
import java.util.*


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
        alreadyExists(orderResource.findByOrderId(order.orderId), order.id, "orderId", errors)
        notEmpty(order.realEstate, "realEstate", errors)
        notEmpty(order.technician, "technician", errors)

        if (shouldValidate(ORDER_EXECUTE, order)) {
            notEmpty(order.firstAppointment, "firstAppointment", errors)
        }

        if (shouldValidate(ORDER_BILL, order)) {
            notEmpty(order.billNo, "billNo", errors)
            notDefault(order.billNo, "billNo", errors)
            alreadyExists(orderResource.findByBillNo(order.billNo), order.id, "billNo", errors)
            notEmpty(order.billDate, "billDate", errors)
        }

        if (shouldValidate(ORDER_BILL_RECIEVED, order)) {
            notEmpty(order.paymentRecievedDate, "paymentRecievedDate", errors)
        }
    }

    private fun shouldValidate(stateToValidate: OrderState, order: Order): Boolean {
        var orderStatus = order.status;
        if (order.prevStatus != null && order.status.ordinal > 0) {
            orderStatus = OrderState.values()[order.status.ordinal - 1]
        }
        return stateToValidate.ordinal <= orderStatus.ordinal
    }

    private fun sameStatus(existingOrder: Optional<Order>, order: Order): Boolean {
        return existingOrder.isPresent && existingOrder.get().status.equals(order.status)
    }

    fun notDefault(input: String?, field: String, errors: Errors) {
        if (input != null && input.startsWith("R") && input.endsWith('-')) {
            errors.rejectValue(field, "noDefaultValue", "ungültiger Wert")
        }

    }
}