package com.tollwood.rechnungen.page.impl

import com.tollwood.jpa.Order
import org.openqa.selenium.By
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.interactions.Actions
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class OrderEdit(private var driver: WebDriver) {
    val ORDER_EDIT = By.cssSelector(".order-edit")
    val ORDER_ID_INPUT = By.cssSelector("#orderId")
    val ORDER_ID_INPUT_ERROR = By.cssSelector(".error.field.OrderIdInput")

    val TECHNICIAN_INPUT_ERROR = By.cssSelector(".error.field #technician")
    val TECHNICIAN_INPUT = By.cssSelector("#technician input")

    val REAL_ESTATE_INPUT_ERROR = By.cssSelector(".error.field #realestate")
    val REAL_ESTATE_INPUT = By.cssSelector("#realestate input")
    val VALID_ORDER_ID_ICON = By.cssSelector(".OrderIdInput i.green.check")

    val CANCEL_BTTN = By.cssSelector(".cancel-bttn")
    val SAVE_BTTN = By.cssSelector(".save-bttn")
    val SAVE_CONTINUE_BTTN = By.cssSelector(".save-continue")
    val SAVE_CONTINUE_OPTION = By.cssSelector(".save-continue .item")
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

        if (leaveFocus) orderIdInput.sendKeys(Keys.TAB)
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

    fun clickSave(): OrderEdit {
        driver.findElement<WebElement>(SAVE_BTTN).click()
        return this
    }

    fun delete(): OrderOverview {

        val element = WebDriverWait(driver, 10)
                .until(elementToBeClickable(DELETE_BTTN))
        val actions = Actions(driver)
        actions.moveToElement(element)
        actions.perform()

        element.click()
        return OrderOverview(driver)
    }

    fun verifyDeleteButton(): OrderEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(DELETE_BTTN))
        return this
    }

    fun verifyRequiredFields(): OrderEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(ORDER_ID_INPUT_ERROR))
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(TECHNICIAN_INPUT_ERROR))
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(REAL_ESTATE_INPUT_ERROR))
        return this
    }

    fun enterOrderEditData(newOrder: Order): OrderEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(ORDER_ID_INPUT)).sendKeys(newOrder.orderId)
        selectTechnician()
        selectRealEstate()
        return this
    }

    private fun selectTechnician() {
        val dropDown = WebDriverWait(driver, 10).until(presenceOfElementLocated(TECHNICIAN_INPUT))
        dropDown.click()
        dropDown.sendKeys(Keys.TAB)
    }

    private fun selectRealEstate() {
        val dropDown = WebDriverWait(driver, 10).until(presenceOfElementLocated(REAL_ESTATE_INPUT))
        dropDown.click()
        dropDown.sendKeys(Keys.TAB)
    }

    fun clickSaveAndContinue(): OrderEdit {
        WebDriverWait(driver, 10).until(presenceOfElementLocated(SAVE_CONTINUE_BTTN)).click()
        WebDriverWait(driver, 10).until(presenceOfElementLocated(SAVE_CONTINUE_OPTION)).click()
        return this
    }
}
