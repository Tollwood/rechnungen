package com.tollwood.rechnungen.page.impl

import com.tollwood.jpa.Employee
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class EmployeeEdit(private var driver: WebDriver) {
    val EMPLOYEE_EDIT = By.cssSelector(".employee-edit")
    val CANCEL_BTTN = By.cssSelector(".cancel-bttn")
    val SAVE_BTTN = By.cssSelector(".save-bttn")
    val CLOSE_BTTN = By.cssSelector(".close")

    val TECHNICIAN_ID_INPUT = By.cssSelector("#technicianId")
    val FIRST_NAME_INPUT = By.cssSelector("#firstName")
    val LAST_NAME_INPUT = By.cssSelector("#lastName")
    val TAX_IDENT_INPUT = By.cssSelector("#taxtIdent")

    fun verifyOnEmployeeEditPage(): EmployeeEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(EMPLOYEE_EDIT))
        return this
    }

    fun clickCancel(): EmployeeOverview {
        driver.findElement<WebElement>(CANCEL_BTTN).click()
        return EmployeeOverview(driver)
    }

    fun clickClose(): OverviewPage {
        driver.findElement<WebElement>(CLOSE_BTTN).click()
        val overviewPage = OverviewPage(driver)
        PageFactory.initElements(driver, overviewPage)
        return overviewPage
    }

    fun clickSaveSuccess(): EmployeeOverview {
        driver.findElement<WebElement>(SAVE_BTTN).click()
        return EmployeeOverview(driver)
    }

    fun enterEmployeeData(newEmployee: Employee): EmployeeEdit {

        driver.findElement<WebElement>(TECHNICIAN_ID_INPUT).sendKeys(newEmployee.technicianId)
        driver.findElement<WebElement>(FIRST_NAME_INPUT).sendKeys(newEmployee.firstName)
        driver.findElement<WebElement>(LAST_NAME_INPUT).sendKeys(newEmployee.lastName)
        driver.findElement<WebElement>(TAX_IDENT_INPUT).sendKeys(newEmployee.taxIdent)
        AddressEdit.enterAddressData(driver, newEmployee.address)
        return this
    }
}
