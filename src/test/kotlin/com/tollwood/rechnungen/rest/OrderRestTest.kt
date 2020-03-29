package com.tollwood.rechnungen.rest

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import com.tollwood.order.jpa.Order
import com.tollwood.order.jpa.OrderState
import com.tollwood.jpa.ServiceOrder
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@SpringBootTest
@AutoConfigureMockMvc
class OrderRestTest : RestTest() {

    @Test
    fun `get all orders without jwt`() {
        this.mockMvc.perform(get("/api/orders")).andExpect(status().isForbidden())
    }

    @Test
    fun `get all orders with jwt`() {
        this.mockMvc.perform(get("/api/order").headers(givenHeaders())).andExpect(status().isOk())
    }


    @Test
    fun `create order min success`() {
        this.mockMvc.perform(post("/api/order")
                .headers(givenHeaders())
                .content(givenPostBody("1")))
                .andExpect(status().isCreated())
    }

    @Test
    fun `create order min with service success`() {
        this.mockMvc.perform(post("/api/order")
                .headers(givenHeaders())
                .content(givenPostBody("2")))
                .andExpect(status().isCreated())
    }

    @Test
    fun `create order validation errors`() {
        this.mockMvc.perform(post("/api/order")
                .headers(givenHeaders())
                .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("orderId", equalTo("Pflichtfeld")))
                .andExpect(jsonPath("technician", equalTo("Pflichtfeld")))
                .andExpect(jsonPath("realEstate", equalTo("Pflichtfeld")))
    }

    @Test
    fun `patch order empty`() {
        val order = testData.givenOrderPersisted("1234")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content("{}"))
                .andExpect(status().isOk())

        val dbOrder = testData.orderResource.findById(order.id!!)
        assertThat(dbOrder.isPresent()).isTrue()
        assertThat(dbOrder.get().orderId).isNotNull()
        assertThat(dbOrder.get().technician).isNotNull()
        assertThat(dbOrder.get().realEstate).isNotNull()
    }

    @Test
    fun `patch order min success`() {
        val orderId = "112345"
        val order = testData.givenOrderPersisted(orderId)

        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(order)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))

        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(order)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))
                .andExpect(jsonPath("$.billItems[0].code", equalTo("1A")))

        assertThat(testData.orderResource.findByOrderId(orderId).get().billItems.size).isEqualTo(1)

    }

    @Test
    fun `patch order with service success`() {
        val orderId = "12345"
        val order = testData.givenOrderPersisted(orderId)

        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBodyWithService()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))
                .andExpect(jsonPath("$.services", hasSize<String>(1)))

        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBodyWithService()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))
                .andExpect(jsonPath("$.billItems[0].code", equalTo("1A")))

        assertThat(testData.orderResource.findByOrderId(orderId).get().billItems.size).isEqualTo(1)

    }

    private fun givenPatchBodyWithService(): String {
        return """{"orderId":"24","technician":"http://localhost:8090/api/employee/1","realEstate":"http://localhost:8090/api/realestate/1","smallOrder":false,"includeKmFee":true,"status":"ORDER_EXECUTE","prevStatus":"ORDER_EDIT","services":[{"amount":"2","service":"http://localhost:8090/api/service/16","_links":{"service":{"href":"http://localhost:8090/api/service/16"}}}],"billItems":[],"billDate":"","billNo":"","paymentRecievedDate":"","sum":0,"_links":{}}"""
    }

    @Test
    fun `patch order switch to orderExecute`() {
        val orderId = "123456"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(status = OrderState.ORDER_EXECUTE, prevStatus = OrderState.ORDER_EDIT)
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_EXECUTE.toString())))
    }

    @Test
    fun `patch order invalid orderExecute`() {
        val orderId = "1234567"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(status = OrderState.ORDER_EXECUTE, prevStatus = OrderState.ORDER_EXECUTE)
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("firstAppointment", equalTo("Pflichtfeld")))
    }

    @Test
    fun `patch order valid orderExecute`() {
        val orderId = "36447879e"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(status = OrderState.ORDER_EXECUTE, prevStatus = OrderState.ORDER_EXECUTE, firstAppointment = "01.01" +
                ".2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_EXECUTE.toString())))
    }

    @Test
    fun `patch order valid ORDER_BILL`() {
        val orderId = "3"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(
                status = OrderState.ORDER_BILL,
                prevStatus = OrderState.ORDER_BILL,
                firstAppointment = "01.01.2019",
                billNo = "3",
                billDate = "02.01.2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_BILL.toString())))

        val updatedOrder = testData.orderResource.findById(order.id!!).get()
        assertThat(updatedOrder.status).isEqualTo(OrderState.ORDER_BILL)
    }

    @Test
    fun `patch order switch to ORDER_BILL`() {
        val orderId = "4"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(
                status = OrderState.ORDER_BILL,
                prevStatus = OrderState.ORDER_EXECUTE,
                firstAppointment = "01.01.2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_BILL.toString())))

        val updatedOrder = testData.orderResource.findById(order.id!!).get()
        assertThat(updatedOrder.status).isEqualTo(OrderState.ORDER_BILL)
    }

    @Test
    fun `patch order invalid ORDER_BILL_RECIEVED`() {
        val orderId = "5"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(
                status = OrderState.ORDER_BILL_RECIEVED,
                prevStatus = OrderState.ORDER_BILL_RECIEVED,
                firstAppointment = "01.01.2019",
                billNo = "5",
                billDate = "02.01.2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("paymentRecievedDate", equalTo("Pflichtfeld")))

        val updatedOrder = testData.orderResource.findById(order.id!!).get()
        assertThat(updatedOrder.status).isEqualTo(order.status)
    }

    @Test
    fun `patch order valid ORDER_BILL_RECIEVED`() {
        val orderId = "6"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(
                status = OrderState.ORDER_BILL_RECIEVED,
                prevStatus = OrderState.ORDER_BILL_RECIEVED,
                firstAppointment = "01.01.2019",
                billNo = "6",
                billDate = "02.01.2019",
                paymentRecievedDate = "03.01.2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_BILL_RECIEVED.toString())))

        val updatedOrder = testData.orderResource.findById(order.id!!).get()
        assertThat(updatedOrder.status).isEqualTo(OrderState.ORDER_BILL_RECIEVED)
    }

    @Test
    fun `patch order switch to ORDER_BILL_RECIEVED`() {
        val orderId = "7"
        val order = testData.givenOrderPersisted(orderId)
        val modifiedOrder = order.copy(
                status = OrderState.ORDER_BILL_RECIEVED,
                prevStatus = OrderState.ORDER_BILL,
                firstAppointment = "01.01.2019",
                billNo = "7",
                billDate = "02.01.2019")
        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(modifiedOrder)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status", equalTo(OrderState.ORDER_BILL_RECIEVED.toString())))

        val updatedOrder = testData.orderResource.findById(order.id!!).get()
        assertThat(updatedOrder.status).isEqualTo(OrderState.ORDER_BILL_RECIEVED)
    }

    private fun givenPatchBody(order: Order, orderService: ServiceOrder? = null): String {
        val json: JsonNode = objectMapper.valueToTree(order)
        val objectNode: ObjectNode = json as ObjectNode
        objectNode.put("technician", "http://localhost:8090/api/employee/" + order.technician!!.id)
        objectNode.put("realEstate", "http://localhost:8090/api/realestate/" + order.realEstate!!.id)

        if(orderService != null){
            val servicesArray = objectNode.putArray("services")
            val serviceNode = JsonNodeFactory.instance.objectNode()
            serviceNode.put("amount", 1)
            serviceNode.put("service", "http://localhost:8090/api/service/" + orderService.service.id)
            servicesArray.add(serviceNode)
        }

        return objectNode.toString()
    }

    private fun givenPostBody(orderId: String): String {

        val newOrder = Order(orderId = orderId, technician = testData.employeeResource.findById(1).get(), realEstate = testData
                .realestateResource.findById(2)
                .get(),company = testData.companyResource.getCurrent())


        val json: JsonNode = objectMapper.valueToTree(newOrder)
        val objectNode: ObjectNode = json as ObjectNode
        objectNode.put("technician", "http://localhost:8090/api/employee/1")
        objectNode.put("realEstate", "http://localhost:8090/api/realestate/2")

        return objectNode.toString()
    }

}