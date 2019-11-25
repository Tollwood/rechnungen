package com.tollwood.rechnungen.rest

import com.fasterxml.jackson.databind.ObjectMapper
import com.tollwood.rechnungen.TestData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.json.JacksonJsonParser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

abstract  class RestTest {
    @Autowired
    protected lateinit var mockMvc: MockMvc

    @Autowired
    protected lateinit var testData: TestData

    @Autowired
    protected lateinit var objectMapper: ObjectMapper

    protected fun getAccessToken(): String {

        val result = mockMvc.perform(post("/authenticate")
                .content("""{"username":"admin","password":"1234"}""")
                .accept("application/json")
                .contentType("application/json"))
                .andExpect(status().isOk)

        val resultString = result.andReturn().response.contentAsString
        val jsonParser = JacksonJsonParser()
        return jsonParser.parseMap(resultString)["jwttoken"].toString()
    }
}