package com.tollwood.rechnungen

import com.tollwood.EmployeeResource
import com.tollwood.OrderResource
import com.tollwood.RealestateResource
import com.tollwood.jpa.Address
import com.tollwood.jpa.Order
import com.tollwood.jpa.RealEstate
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

    fun givenOrderPersisted(orderId: String) {
        orderResource.save(givenOrder(orderId))
    }

    fun givenOrder(orderId: String): Order {
        val technician = employeeResource.findAll().first()
        val realEstate = realestateResource.findAll().first()
        return Order(orderId, technician = technician, realEstate = realEstate)
    }

    fun givenRealEstatePersisted(): RealEstate {
        return realestateResource.save(givenRealEstate())
    }

    fun givenRealEstate(): RealEstate {
        return RealEstate(name = "New RealEstate", address = Address("New Street", "2", "22111", "NewTown"), distance = 5)
    }
}