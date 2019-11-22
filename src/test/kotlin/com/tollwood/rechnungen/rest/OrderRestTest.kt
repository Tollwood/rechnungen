package com.tollwood.rechnungen.rest

import org.assertj.core.api.Assertions.assertThat
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
    fun `create order`() {
        this.mockMvc.perform(post("/api/order")
                .headers(givenHeaders())
                .content(givenPostBody()))

                .andExpect(status().isCreated())
    }

    @Test
    fun `patch order`() {
        val orderId = "1234"
        val order = testData.givenOrderPersisted(orderId)

        this.mockMvc.perform(put("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(orderId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems",hasSize<String>(1)))

        this.mockMvc.perform(put("/api/order/" + order.id)
                .headers(givenHeaders())
                .content(givenPatchBody(orderId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.billItems",hasSize<String>(1)))

        assertThat(testData.orderResource.findByOrderId(orderId).get().billItems.size).isEqualTo(1)

    }

    private fun givenPatchBody(orderId: String): String {
        return """{"orderId":"$orderId","type":null,"firstAppointment":"26.11.2019","secondAppointment":null,"utilisationUnit":null,
            |"name":null,
            |"location":null,"phoneNumber":null,"smallOrder":false,"services":[],"billItems":[{"code":"1A","serviceName":"Liegeschaftspauschale","price":17.5,"amount":1,"_links":{"order":{"href":"http://localhost:8090/api/order/107"}}},{"code":"1B","serviceName":"Anfahrt bis 30 km","price":7.5,"amount":1,"_links":{"order":{"href":"http://localhost:8090/api/order/107"}}}],"status":"ORDER_EXECUTE","includeKmFee":true,"billNo":"","billDate":"","paymentRecievedDate":"","sum":25,"_links":{"self":{"href":"http://localhost:8090/api/order/107"},"order":{"href":"http://localhost:8090/api/order/107"},"technician":{"href":"http://localhost:8090/api/order/107/technician"},"realEstate":{"href":"http://localhost:8090/api/order/107/realEstate"}},"technician":"http://localhost:8090/api/employee/1","realEstate":"http://localhost:8090/api/realestate/2"}""".trimMargin()
    }

    private fun givenPostBody(): String {
        return """{"orderId":"1","technician":"http://localhost:8090/api/employee/1","realEstate":"http://localhost:8090/api/realestate/2","smallOrder":false,"includeKmFee":true,"status":"ORDER_EDIT","services":[],"billItems":[],"billDate":"","billNo":"","paymentRecievedDate":"","sum":0,"_links":{}}""".trimMargin()
    }


    private fun givenHeaders(): HttpHeaders {
        val httpHeaders = HttpHeaders()
        httpHeaders.put("Authorization", listOf("Bearer " + getAccessToken()))
        httpHeaders.put(HttpHeaders.ACCEPT, listOf("application/json"))
        httpHeaders.put(HttpHeaders.CONTENT_TYPE, listOf("application/json"))
        return httpHeaders
    }
}