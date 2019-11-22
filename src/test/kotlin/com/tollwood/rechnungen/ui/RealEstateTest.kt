package com.tollwood.rechnungen.ui

import com.tollwood.jpa.Address
import com.tollwood.jpa.RealEstate
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(SeleniumExtension::class)
internal class RealEstateTest : UiTest() {


    private val INITIAL_ROW_COUNT = 5

    @Test
    fun testRealEstateOverview() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickRealEstateOverview()
                .verifyOnRealEstateOverviewPage()
                .verifyPageContent()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCancelAddRealEstate() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickRealEstateOverview()
                .verifyOnRealEstateOverviewPage()
                .clickAdd()
                .verifyOnRealEstateEditPage()
                .clickCancel()
                .verifyOnRealEstateOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCloseAddRealEstate() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickRealEstateOverview()
                .verifyOnRealEstateOverviewPage()
                .clickAdd()
                .verifyOnRealEstateEditPage()
                .clickClose()
                .verifyOverviewPage()
    }

    @Test
    fun testAddRealEstate() {
        val newRealEstate = RealEstate(1, "222-312", Address("Real-Estate-Road", "77", "25355", "Barmstedt"), 45)
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickRealEstateOverview()
                .verifyOnRealEstateOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT )
                .clickAdd()
                .verifyOnRealEstateEditPage()
                .enterRealEstateeData(newRealEstate)
                .clickSaveSuccess()
                .verifyOnRealEstateOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT + 1)
    }

    @Test
    fun testDeleteRealEstate(){
        val persistedRealEstate = testData.givenRealEstatePersisted()
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickRealEstateOverview()
                .expectNRows(INITIAL_ROW_COUNT +1)
                .verifyOnRealEstateOverviewPage()
                .selectByName(persistedRealEstate.name)
                .verifyOnRealEstateEditPage()
                .clickDelete()
                .expectNRows(INITIAL_ROW_COUNT)

    }
}