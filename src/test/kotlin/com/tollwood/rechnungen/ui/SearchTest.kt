package com.tollwood.rechnungen.ui

import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(SeleniumExtension::class)
internal class SearchTest : UiTest() {

    @Test
    fun testSearchNew() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .enterSearch("1234-1234-99")
                .expectAddSuggestion("1234-1234-99")
                .executeSearch()
                .verifyOnOrderEditPage()
        //.verifyValidOrderId()
    }

    @Test
    fun testSearchSelectAdd() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .enterSearch("1234-1234-99")
                .expectAddSuggestion("1234-1234-99")
                .selectAdd()
                .verifyOnOrderEditPage()
                .verifyValidOrderId()
    }

    @Test
    fun testSearchExisting() {
        testData.givenOrderPersisted("1234-1234-99")

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .enterSearch("1234-1234-99")
                .expectSuggestion("1234-1234-99")
                .executeSearch()
                .verifyOnOrderEditPage()
                //.verifyValidOrderId()
                .verifyDeleteButton()
    }

    @Test
    fun testSearchBillExisting() {
        val orderId = "1234-12"
        testData.givenOrderWithBillPersisted(orderId)

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .enterSearch(orderId)
                .expectSuggestion(orderId)
                .expectSuggestion(orderId + "-bill")
    }
}