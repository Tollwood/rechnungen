package com.tollwood.rechnungen.ui

import com.tollwood.service.Service
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(SeleniumExtension::class)
internal class ServiceTest : UiTest() {

    private val INITIAL_ROW_COUNT = 49

    @Test
    fun testServiceOverview() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickServiceOverview()
                .verifyPageContent()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCancelAddService() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickServiceOverview()
                .verifyOnServiceOverviewPage()
                .clickAdd()
                .verifyOnServiceEditPage()
                .clickCancel()
                .verifyOnServiceOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCloseAddService() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickServiceOverview()
                .verifyOnServiceOverviewPage()
                .clickAdd()
                .verifyOnServiceEditPage()
                .clickClose()
                .verifyOverviewPage()
    }

    @Test
    fun testAddService() {
        val newService = Service(1, "99F", "Great Stuff", 2.34, true)
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickServiceOverview()
                .verifyOnServiceOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT )
                .clickAdd()
                .verifyOnServiceEditPage()
                .enterServiceData(newService)
                .clickSaveSuccess()
                .clickCancel()
                .verifyOnServiceOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT + 1)
    }
}