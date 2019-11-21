package com.tollwood.rechnungen.ui.impl.page

import com.tollwood.jpa.Address
import com.tollwood.jpa.BankDetails
import com.tollwood.jpa.Employee
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(SeleniumExtension::class)
internal class EmployeeTest : UiTest() {


    @Test
    fun testEmployeeOverview() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickEmployeeOverview()
                .verifyOnEmployeeOverviewPage()
                .verifyPageContent()
                .expectNRows(3)
    }

    @Test
    fun testCancelAddEmployee() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickEmployeeOverview()
                .verifyOnEmployeeOverviewPage()
                .clickAdd()
                .verifyOnEmployeeEditPage()
                .clickCancel()
                .verifyOnEmployeeOverviewPage()
                .expectNRows(3)
    }

    @Test
    fun testCloseAddEmployee() {
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickEmployeeOverview()
                .verifyOnEmployeeOverviewPage()
                .clickAdd()
                .verifyOnEmployeeEditPage()
                .clickClose()
                .verifyOverviewPage()
    }

    @Test
    fun testAddEmployee() {
        val newEmployee = Employee(1, "Max", "Mustermann", Address("Musterstrasse", "2", "25355", "Barmstedt"), "1234-1234", "T1",
                "email", "phone", BankDetails("bankName", "iban", "bic"))
        overviewPage
                .expectLoggedIn("admin", "1234")
                .verifyOverviewPage()
                .clickEmployeeOverview()
                .verifyOnEmployeeOverviewPage()
                .clickAdd()
                .verifyOnEmployeeEditPage()
                .enterEmployeeData(newEmployee)
                .clickSaveSuccess()
                .verifyOnEmployeeOverviewPage()
                .expectNRows(4)
    }
}