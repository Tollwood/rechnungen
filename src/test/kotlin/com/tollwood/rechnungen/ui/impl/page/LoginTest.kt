package com.tollwood.rechnungen.ui.impl.page


import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith


@ExtendWith(SeleniumExtension::class)
internal class LoginTest : UiTest() {

    @Test
    fun testLoginSuccess() {
        overviewPage.expectLoginModal()
                .expectNoLoginErrorMessage()
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
                .expectLoginErrorMessage()

                .enterUsername("a")
                .expectNoLoginErrorMessage()

                .loginFailure()
                .expectOnPage()
                .expectLoginErrorMessage()

                .enterPassword("b")
                .expectNoLoginErrorMessage()


    }
}