package com.tollwood.rechnungen

import com.tollwood.EmployeeResource
import com.tollwood.OrderResource
import com.tollwood.RealestateResource
import com.tollwood.ServiceResource
import com.tollwood.jpa.Address
import com.tollwood.jpa.Order
import com.tollwood.jpa.RealEstate
import com.tollwood.jpa.ServiceOrder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class TestData {

    @Autowired
    lateinit var orderResource: OrderResource

    @Autowired
    lateinit var employeeResource: EmployeeResource

    @Autowired
    lateinit var realestateResource: RealestateResource

    @Autowired
    lateinit var serviceResource: ServiceResource

    fun givenOrderPersistedWithRealEstateAndEmployee(order:Order): Order {
        return orderResource.save(order.copy(technician = employeeResource.findAll().first(), realEstate =  realestateResource.findAll().first()))
    }
    fun givenOrderPersisted(orderId: String): Order {
        return orderResource.save(givenOrder(orderId))
    }

    fun givenOrder(orderId: String): Order {
        return Order(orderId = orderId, technician = employeeResource.findAll().first(), realEstate = realestateResource.findAll().first())
    }

    fun givenOrderWithBill(orderId: String): Order {
        val technician = employeeResource.findAll().first()
        val realEstate = realestateResource.findAll().first()
        return Order(orderId = orderId, technician = technician, realEstate = realEstate, billNo = orderId + "-bill")
    }

    fun givenRealEstatePersisted(): RealEstate {
        return realestateResource.save(givenRealEstate())
    }

    fun givenRealEstate(distance: Int = 5): RealEstate {
        return RealEstate(name = "New RealEstate", address = Address("New Street", "2", "22111", "NewTown"), distance = distance)
    }

    fun givenOrderWithBillPersisted(orderId: String): Order {
        return orderResource.save(givenOrderWithBill(orderId))
    }

    fun givenAdditionalService(order: Order, code: String, amount: Int = 1): ServiceOrder {
        val service = serviceResource.findByArticleNumber(code).get();
        return ServiceOrder(1, amount, service, order)
    }

    fun givenOrderService(order: Order): ServiceOrder {
        return ServiceOrder(amount = 1,service = serviceResource.findAll().first(),order = order)
    }
}