package com.tollwood.rechnungen.page.impl

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.ui.ExpectedConditions.numberOfElementsToBe
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class OrderOverview(private var driver: WebDriver) {


    val ROW_SELECTOR = By.ByCssSelector(".order-list > tbody > tr")
    val ADD_BTTN = By.ByCssSelector(".add")

    val ORDER_OVERVIEW = By.cssSelector(".order-overview")

    val TITLE = By.cssSelector(".menu-title")

    fun expectNRows(n: Number): OrderOverview {
        WebDriverWait(driver, 10)
                .until(numberOfElementsToBe(ROW_SELECTOR, n.toInt()))
        return this
    }

    fun verifyOnOrderOverviewPage(): OrderOverview {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(ORDER_OVERVIEW))
        return this
    }

    fun verifyPageContent(): OrderOverview {
        assertThat(driver.findElement<WebElement>(TITLE).text, equalTo("Aufträge"))
        return this
    }

    fun clickAdd(): OrderEdit {
        driver.findElement<WebElement>(ADD_BTTN).click()
        return OrderEdit(driver)
    }

    fun selectFirst(): OrderEdit {
        driver.findElements<WebElement>(ROW_SELECTOR).first().click()
        return OrderEdit(driver)
    }
}
