package com.tollwood.order.jpa

import com.tollwood.company.CompanyResource
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
class BeforeSaveOrderValidtor(@Autowired orderResource: OrderResource, @Autowired companyResource: CompanyResource) : OrderValidtor
(orderResource, companyResource)


@Component("beforeCreateOrderValidtor")
class BeforeCreateOrderValidtor(@Autowired orderResource: OrderResource, @Autowired companyResource: CompanyResource) : OrderValidtor(orderResource, companyResource)

open class OrderValidtor(@Autowired val orderResource: OrderResource, @Autowired val companyResource: CompanyResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return Order::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val order = obj as Order
        val company = companyResource.getCurrent()
        if (order.orderId == null) {
            order.orderId = company.billNo.toString()
            company.billNo = company.billNo + 1
        }

        notEmpty(order.orderId, "orderId", errors);
        alreadyExists(orderResource.findByOrderId(order.orderId), order.id, "orderId", order.orderId, errors)

        if (company.realEstateSupport) {
            notEmpty(order.realEstate, "realEstate", errors)
        }

        if (company.customerSupport) {
            if (order.customer == null) {
                errors.rejectValue("order.customer", "required", "Pflichtfeld")
            } else {
                notEmpty(order.customer.lastName, "customer.lastName", errors)
                notEmpty(order.customer.phoneNumber, "customer.phoneNumber", errors)
            }
        }

        if (company.employeeSupport) {
            notEmpty(order.technician, "technician", errors)
        }

        if (shouldValidate(ORDER_EXECUTE, order)) {
            notEmpty(order.services, "services", errors)
            notEmpty(order.firstAppointment, "firstAppointment", errors)
            notNull(order.distance, "distance", errors)
        }

        if (company.billingSupport) {
            if (shouldValidate(ORDER_BILL, order)) {
                notEmpty(order.billNo, "billNo", errors)
                notDefault(order.billNo, "billNo", errors)
                notEmpty(order.billDate, "billDate", errors)
            }
            if (order.billNo != null && !"".equals(order.billNo)) {
                alreadyExists(orderResource.findByBillNo(order.billNo), order.id, "billNo", order.billNo, errors)
            }
        }

        if (shouldValidate(ORDER_BILL_RECIEVED, order)) {
            notEmpty(order.paymentRecievedDate, "paymentRecievedDate", errors)
        }
    }

    private fun shouldValidate(stateToValidate: OrderState, order: Order): Boolean {
        val orderStatus = order.prevStatus ?: order.status;
        return stateToValidate.order <= orderStatus.order
    }

    fun notDefault(input: String?, field: String, errors: Errors) {
        if (input != null && input.startsWith("R") && input.endsWith('-')) {
            errors.rejectValue(field, "noDefaultValue", "ungültiger Wert")
        }

    }
}