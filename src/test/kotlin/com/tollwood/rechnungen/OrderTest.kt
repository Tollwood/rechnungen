package com.tollwood.rechnungen

import com.tollwood.OrderResource
import com.tollwood.jpa.Order
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired

@ExtendWith(SeleniumExtension::class)
internal class OrderTest : UiTest() {

    @Autowired
    lateinit var orderResource: OrderResource

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
    fun testCloseAddRealEstate() {
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

    //Validate requiredFields OrderEdit
    //Validate requiredFields ORDER_BILL

    @Test
    fun testDeleteExistingOrder(){
        givenOrder()

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

    private fun givenOrder() {
        orderResource.save(Order("1234"))
    }
}