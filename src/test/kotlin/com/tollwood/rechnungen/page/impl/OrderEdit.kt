package com.tollwood.rechnungen.page.impl

import org.openqa.selenium.By
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class OrderEdit(private var driver: WebDriver) {
    val ORDER_EDIT = By.cssSelector(".order-edit")
    val ORDER_ID_INPUT = By.cssSelector("#orderId")
    val VALID_ORDER_ID_ICON = By.cssSelector(".OrderIdInput i.green.check")

    val CANCEL_BTTN = By.cssSelector(".cancel-bttn")
    val SAVE_BTTN = By.cssSelector(".save-bttn")
    val CLOSE_BTTN = By.cssSelector(".close")
    val DELETE_BTTN = By.cssSelector(".delete-bttn")


    fun verifyOnOrderEditPage(): OrderEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(ORDER_EDIT))
        return this
    }

    fun verifyValidOrderId(): OrderEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(VALID_ORDER_ID_ICON))
        return this
    }

    fun enterOrderId(value: String, leaveFocus: Boolean): OrderEdit {
        val orderIdInput = driver.findElement<WebElement>(ORDER_ID_INPUT)
        orderIdInput.sendKeys(value)

        if (leaveFocus) orderIdInput.sendKeys(Keys.TAB) else null
        return this
    }

    fun clickCancel(): OrderOverview {
        driver.findElement<WebElement>(CANCEL_BTTN).click()
        return OrderOverview(driver)
    }

    fun clickClose(): OverviewPage {
        driver.findElement<WebElement>(CLOSE_BTTN).click()
        val overviewPage = OverviewPage(driver)
        PageFactory.initElements(driver, overviewPage)
        return overviewPage
    }

    fun clickSaveSuccess(): OrderOverview {
        driver.findElement<WebElement>(SAVE_BTTN).click()
        return OrderOverview(driver)
    }

    fun delete(): OrderOverview {
        driver.findElement<WebElement>(DELETE_BTTN).click()
        return OrderOverview(driver)
    }


}
