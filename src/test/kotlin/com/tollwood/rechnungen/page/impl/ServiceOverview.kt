package com.tollwood.rechnungen.page.impl

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.ui.ExpectedConditions.numberOfElementsToBe
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class ServiceOverview(private var driver: WebDriver) {


    val ROW_SELECTOR = By.ByCssSelector(".service-list > tbody > tr")
    val ADD_BTTN = By.ByCssSelector(".add")

    val REALESTATE_OVERVIEW = By.cssSelector(".service-overview")

    @FindBy(className = "menu-title")
    lateinit var title: WebElement

    fun expectNRows(n: Number) {
        WebDriverWait(driver,10)
                .until(numberOfElementsToBe(ROW_SELECTOR,n.toInt()))
    }

    fun verifyOnServiceOverviewPage(): ServiceOverview {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(REALESTATE_OVERVIEW))
        return this
    }

    fun verifyPageContent(): ServiceOverview {
        title.isDisplayed
        assertThat(title.text, equalTo("Dienstleistungen"))
        return this
    }

    fun clickAdd(): ServiceEdit {
        driver.findElement<WebElement>(ADD_BTTN).click()
        return ServiceEdit(driver)
    }
}
