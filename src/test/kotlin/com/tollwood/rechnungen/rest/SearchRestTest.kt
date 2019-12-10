package com.tollwood.rechnungen.rest

import com.tollwood.jpa.Order
import org.hamcrest.Matchers.*
import org.junit.FixMethodOrder
import org.junit.jupiter.api.Test
import org.junit.runners.MethodSorters
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.Commit
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import javax.persistence.EntityManager
import javax.transaction.Transactional


@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class SearchRestTest : RestTest() {

    @Test
    fun `search without jwt`() {
        this.mockMvc.perform(get("/api/search")).andExpect(status().isForbidden())
    }

    private var orders: List<Order>? = emptyList()

    @Test
    @Commit
    fun `a) persist Data`() {
        orders = listOf(
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "1", billNo = "B1")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "2", billNo = "B2")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "3", billNo = "B3")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "4")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "5")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "1234")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "234")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "12345")),
                testData.givenOrderPersistedWithRealEstateAndEmployee(Order(orderId = "34"))
        )
    }

    @Test
    fun `search no result`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "NothingToFind"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", anEmptyMap<String,String>()))
    }

    @Test
    fun `search orderId`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "1234"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order[0].orderId", equalTo("1234")))
    }

    @Test
    fun `search billNo`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "B2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order[0].billNo", equalTo("B2")))
    }

    @Test
    fun `search city`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "Barmstedt"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order[0].realEstate.address.city", equalTo("Barmstedt")))
    }

    @Test
    fun `search street`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "Geschwister-Scholl-Straße"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order[0].realEstate.address.city", equalTo("Barmstedt")))
    }


    @Test
    fun `search plz`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "25355"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order[0].realEstate.address.zipCode", equalTo("25355")))
                .andExpect(jsonPath("$._embedded.order[0]._links.self.href", equalTo("http://localhost/api/order/100")))
                .andExpect(jsonPath("$._embedded.order[0]._links.realEstate.href", equalTo("http://localhost/api/realestate/1")))
                .andExpect(jsonPath("$._embedded.order[0]._links.technician.href", equalTo("http://localhost/api/employee/1")))
    }
    @Test
    fun `empty term`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", ""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order.length()", `is`(9)))
    }

    @Test
    fun `empty term with paging`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "")
                .param("page", "0")
                .param("size","2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order.length()", `is`(2)))
    }


    @Test
    fun `empty term with not existing paging`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "")
                .param("page", "10")
                .param("size","2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", anEmptyMap<String,String>()))
    }


    @Test
    fun `matchting term with paging`() {
        this.mockMvc.perform(get("/api/search")
                .headers(givenHeaders())
                .param("term", "123")
                .param("page", "0")
                .param("size","2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.order.length()", `is`(2)))
    }
}