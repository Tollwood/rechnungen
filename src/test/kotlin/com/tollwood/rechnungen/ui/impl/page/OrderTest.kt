package com.tollwood.rechnungen.ui.impl.page

import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(SeleniumExtension::class)
internal class OrderTest : UiTest() {

    private val INITIAL_ROW_COUNT = 0

    @Test
    fun testOrderOverview() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .verifyOnOrderOverviewPage()
                .verifyPageContent()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCancelAddOrder() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .verifyOnOrderOverviewPage()
                .clickAdd()
                .verifyOnOrderEditPage()
                .clickCancel()
                .verifyOnOrderOverviewPage()
                .expectNRows(INITIAL_ROW_COUNT)
    }

    @Test
    fun testCloseAddOrder() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .verifyOnOrderOverviewPage()
                .clickAdd()
                .verifyOnOrderEditPage()
                .clickClose()
                .verifyOverviewPage()
    }

    @Test
    fun testValidateOrderId() {

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .verifyOnOrderOverviewPage()
                .clickAdd()
                .verifyOnOrderEditPage()
                .enterOrderId("1234", true)
                .verifyValidOrderId()
    }

    @Test
    fun testAddOrder(){

        val newOrder = testData.givenOrder("1234")

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .clickAdd()
                .verifyOnOrderEditPage()
                .enterOrderEditData(newOrder)
                .clickSave()
                .clickCancel()
                .verifyOnOrderOverviewPage()
                .expectNRows(1)
    }


    @Test
    fun testRequiredFieldsForOrderEdit(){

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .clickAdd()
                .verifyOnOrderEditPage()
                .clickSave()
                .verifyRequiredFields()
    }
    @Test
    fun testRequiredFieldsSaveAndContinueForOrderEdit(){

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .clickAdd()
                .verifyOnOrderEditPage()
                .clickSaveAndContinue()
                .verifyRequiredFields()
    }

    //Validate requiredFields ORDER_BILL
    //Validate existing OrderId

    @Test
    fun testDeleteExistingOrder(){
        testData.givenOrderPersisted("1234")

        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickOrderOverview()
                .verifyOnOrderOverviewPage()
                .expectNRows(1)
                .selectFirst()
                .delete()
                .verifyOnOrderOverviewPage()
                .expectNRows(0)
    }
}