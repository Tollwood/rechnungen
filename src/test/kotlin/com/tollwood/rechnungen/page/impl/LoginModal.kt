package com.tollwood.rechnungen.page.impl

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.core.Is.`is`
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.*
import org.openqa.selenium.support.ui.WebDriverWait


class LoginModal(private var driver: WebDriver) {

    @FindBy(name = "username")
    private val usernameInput: WebElement? = null

    @FindBy(name = "password")
    private val passwordInput: WebElement? = null

    @FindBy(name = "login")
    private val loginButton: WebElement? = null

    @FindBy(name = "loginModal")
    private val loginModal: WebElement? = null

    fun enterUsername(username: String): LoginModal {
        usernameInput?.sendKeys(username)
        return this
    }

    fun enterPassword(password: String): LoginModal {
        passwordInput?.sendKeys(password)
        return this
    }

    fun loginSuccess(): OverviewPage {
        loginButton?.click()
        WebDriverWait(driver, 10)
                .until(invisibilityOfAllElements(driver.findElement<WebElement>(By.ByName("loginModal"))))
        val overviewPage = OverviewPage(driver)
        PageFactory.initElements(driver, overviewPage)
        return overviewPage
    }

    fun loginFailure() : LoginModal {
        loginButton?.click()
        return this
    }

    fun expectOnPage(){
        assertThat(loginModal!!.isDisplayed, `is`(true))
    }
}