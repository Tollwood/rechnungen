package com.tollwood.rechnungen

import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.JsonParser
import com.tollwood.OrderRepository
import com.tollwood.jpa.Order
import com.tollwood.jpa.OrderState
import org.apache.http.entity.ContentType
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class OrderRestTest(@Autowired val restTemplate: TestRestTemplate,
                    @Autowired val orderRepository: OrderRepository,
                    @Autowired val testData: TestData,
                    @Autowired val objectMapper: ObjectMapper) : DataTest() {

    val headers = HttpHeaders()

    @Test
    fun `Test Authentication`() {
        val jwtToken = givenJwtToken()
        assertThat(jwtToken).isNotEmpty();
    }

    @Test
    fun `Test list empty Orders`() {
        givenHttpHeaderWithAuthorization()

        val httpEntity = HttpEntity<Any>(headers)
        val entity = restTemplate.exchange("/api/order", HttpMethod.GET, httpEntity, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
    }

    @Test
    fun `Test get existing Order`() {
        val orderId = "1234"
        val persistedOrder = testData.givenOrderPersisted(orderId)
        givenHttpHeaderWithAuthorization()

        val httpEntity = HttpEntity<Any>(headers)
        val entity = restTemplate.exchange("/api/order/" + persistedOrder.id, HttpMethod.GET, httpEntity, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        val jsonNode = objectMapper.readTree(entity.body).get(0)

        assertThat(jsonNode.get("orderId").textValue()).isEqualTo(orderId)
        assertThat(jsonNode.get("status").textValue()).isEqualTo(OrderState.ORDER_EDIT.name)
        assertThat(jsonNode.hasNonNull("realEstate")).isTrue()
        assertThat(jsonNode.hasNonNull("technician")).isTrue()
        assertThat(jsonNode.hasNonNull("firstAppointment")).isFalse()
    }

    @Test
    fun `Test create min Order`() {
        givenHttpHeaderWithAuthorization()

        val orderId = "1234"
        val httpEntity = HttpEntity(testData.givenOrder(orderId), headers)
        val entity = restTemplate.exchange("/api/order", HttpMethod.POST, httpEntity, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.CREATED)
        assertThat(entity.body)
        assertThat(orderRepository.findByOrderId(orderId).size).isEqualTo(1)
    }

    @Test
    fun `Test create max Order`() {
        givenHttpHeaderWithAuthorization()

        val orderId = "1234"
        val httpEntity = HttpEntity(testData.givenMaxOrder(testData.givenOrder(orderId)), headers)
        val entity = restTemplate.exchange("/api/order", HttpMethod.POST, httpEntity, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.CREATED)
        assertThat(entity.body)
        assertThat(orderRepository.findByOrderId(orderId).size).isEqualTo(1)
    }

    @Test
    fun `Test update existing Order`() {
        val orderId = "123"
        val persistedOrder = testData.givenOrderPersisted(orderId)
        givenHttpHeaderWithAuthorization()

        val updatedOrder = testData.givenMaxOrder(persistedOrder)


        val httpEntity = HttpEntity(updatedOrder, headers)
        val entity = restTemplate.exchange("/api/order/" + updatedOrder.id, HttpMethod.PATCH, httpEntity, Order::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(entity.body)
        assertThat(orderRepository.findByOrderId(orderId).size).isEqualTo(1)
    }

    private fun givenHttpHeaderWithAuthorization() {
        val jwtToken = givenJwtToken()
        headers.set(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.mimeType)
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
        this.headers
    }

    @Test
    fun `Test Order not found`() {
        givenHttpHeaderWithAuthorization()

        // when fetching order by Id
        val httpEntity = HttpEntity<Any>(headers)
        val entity = restTemplate.exchange("/api/order/1", HttpMethod.GET, httpEntity, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.NOT_FOUND)

    }

    private fun givenJwtToken(): String {
        val content = """{"username":"admin","password":"1234"}"""
        val headers = HttpHeaders()
        headers.set(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.mimeType)

        val request = HttpEntity(content, headers)
        val entity = restTemplate.exchange("/authenticate", HttpMethod.POST, request, String::class.java)

        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)

        val jsonObject = JsonParser().parse(entity.body).getAsJsonObject()
        return jsonObject.get("jwttoken").asString
    }
}