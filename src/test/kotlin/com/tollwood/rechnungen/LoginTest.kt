package com.tollwood.rechnungen


import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith


@ExtendWith(SeleniumExtension::class)
internal class LoginTest : UiTest() {

    @Test
    fun testLoginSuccess() {
        overviewPage.expectLoginModal()
                .enterUsername("admin")
                .enterPassword("1234")
                .loginSuccess()
                .verifyOverviewPage()
    }

    @Test
    fun testLoginFailure() {
        overviewPage.expectLoginModal()
                .enterUsername("hacker")
                .enterPassword("56789")
                .loginFailure()
                .expectOnPage()
    }
}