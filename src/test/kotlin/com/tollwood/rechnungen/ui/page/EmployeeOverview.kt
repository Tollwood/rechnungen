package com.tollwood.rechnungen.ui.page

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.ui.ExpectedConditions.*
import org.openqa.selenium.support.ui.WebDriverWait

class EmployeeOverview(private var driver: WebDriver) {


    val ROW_SELECTOR = By.ByCssSelector(".employee-list > tbody > tr")
    val ADD_BTTN = By.ByCssSelector("div .add")

    val EMPLOYEE_OVERVIEW = By.cssSelector(".employee-overview")

    @FindBy(className = "menu-title")
    lateinit var title: WebElement

    fun expectNRows(n: Number) {
        WebDriverWait(driver,10)
                .until(numberOfElementsToBe(ROW_SELECTOR,n.toInt()))
    }

    fun verifyOnEmployeeOverviewPage(): EmployeeOverview {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(EMPLOYEE_OVERVIEW))
        return this
    }

    fun verifyPageContent(): EmployeeOverview {
        title.isDisplayed
        assertThat(title.text, equalTo("Mitarbeiter"))
        return this
    }

    fun clickAdd(): EmployeeEdit {
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(ADD_BTTN)).click()
        return EmployeeEdit(driver)
    }
}
