package com.tollwood.rechnungen

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
}