package com.tollwood.rechnungen

import com.tollwood.EmployeeResource
import com.tollwood.OrderRepository
import com.tollwood.RealestateResource
import com.tollwood.jpa.Address
import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
import com.tollwood.jpa.RealEstate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class TestData {

    @Autowired
    lateinit var orderRepository: OrderRepository

    @Autowired
    lateinit var employeeResource: EmployeeResource

    @Autowired
    lateinit var realestateResource: RealestateResource

    fun givenOrderPersisted(orderId: String): Order {
        return orderRepository.save(givenOrder(orderId))
    }

    fun givenOrder(orderId: String): Order {
        val technician = employeeResource.findAll().first()
        val realEstate = realestateResource.findAll().first()
        return Order(orderId = orderId, technician = technician, realEstate = realEstate)
    }

    fun givenOrderWithBill(orderId: String): Order {
        val technician = employeeResource.findAll().first()
        val realEstate = realestateResource.findAll().first()
        return Order(orderId = orderId, technician = technician, realEstate = realEstate, billNo = orderId + "-bill")
    }

    fun givenRealEstatePersisted(): RealEstate {
        return realestateResource.save(givenRealEstate())
    }

    fun givenRealEstate(): RealEstate {
        return RealEstate(name = "New RealEstate", address = Address("New Street", "2", "22111", "NewTown"), distance = 5)
    }

    fun givenOrderWithBillPersisted(orderId: String): Order {
        return orderRepository.save(givenOrderWithBill(orderId))
    }

    fun givenMaxOrder(order: Order): Order {
        return Order(
                id = order.id,
                orderId = order.orderId,
                technician = order.technician,
                realEstate = order.realEstate,
                firstAppointment = "01.01.2019", secondAppointment = "01.02.2019", utilisationUnit = "14",
                name = "Müller", phoneNumber = "112", includeKmFee = true, billDate = "01.03.20.2019", billNo = "12345", location = "2OG1R",
                smallOrder = true, paymentRecievedDate = "01.04.2019", services = emptyList(),
                billItems = emptyList(), status = OrderState.PAYMENT_RECIEVED)
    }
}