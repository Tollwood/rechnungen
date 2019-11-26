package com.tollwood.rechnungen.rest

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.ObjectNode
import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
import com.tollwood.jpa.ServiceOrder
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpHeaders
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
                .content(givenPostBody()))
                .andExpect(status().isCreated())
    }

    @Test
    fun `create order min with service success`() {
        this.mockMvc.perform(post("/api/order")
                .headers(givenHeaders())
                .content(givenPostBody()))
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
                .content(givenPatchBody(order, listOf(testData.givenOrderService(order)))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))

        this.mockMvc.perform(patch("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(order, listOf(testData.givenOrderService(order)))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems", hasSize<String>(1)))
                .andExpect(jsonPath("$.billItems[0].code", equalTo("1A")))

        assertThat(testData.orderResource.findByOrderId(orderId).get().billItems.size).isEqualTo(1)

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
        val orderId = "2"
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

    private fun givenPatchBody(order: Order, services: List<ServiceOrder> = emptyList()): String {
        val json: JsonNode = objectMapper.valueToTree(order)
        val objectNode: ObjectNode = json as ObjectNode
        objectNode.put("technician", "http://localhost:8090/api/employee/" + order.technician!!.id)
        objectNode.put("realEstate", "http://localhost:8090/api/realestate/" + order.realEstate!!.id)

        val servicesArray = objectNode.putArray("services")
        val serviceJson: JsonNode = objectMapper.valueToTree(services.get(0))
        val serviceNode = serviceJson as ObjectNode
        serviceNode.put("service", "http://localhost:8090/api/service/" + services.get(0).service.id)
        serviceNode.put("order", "http://localhost:8090/api/order/" + order.id)
        servicesArray.add(serviceJson as ObjectNode)
        return objectNode.toString()
    }

    private fun givenPostBody(services: List<ServiceOrder> = emptyList()): String {

        val newOrder = Order(orderId = "1", technician = testData.employeeResource.findById(1).get(), realEstate = testData.realestateResource.findById(2)
                .get(), services = services)


        val json: JsonNode = objectMapper.valueToTree(newOrder)
        val objectNode: ObjectNode = json as ObjectNode
        objectNode.put("technician", "http://localhost:8090/api/employee/1")
        objectNode.put("realEstate", "http://localhost:8090/api/realestate/2")

        return objectNode.toString()
    }


    private fun givenHeaders(): HttpHeaders {
        val httpHeaders = HttpHeaders()
        httpHeaders.put("Authorization", listOf("Bearer " + getAccessToken()))
        httpHeaders.put(HttpHeaders.ACCEPT, listOf("application/json"))
        httpHeaders.put(HttpHeaders.CONTENT_TYPE, listOf("application/json"))
        return httpHeaders
    }
}