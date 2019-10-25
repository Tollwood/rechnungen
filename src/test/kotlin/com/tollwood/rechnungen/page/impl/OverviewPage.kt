package com.tollwood.rechnungen.page.impl

import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.MatcherAssert.assertThat
import org.openqa.selenium.By
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable
import org.openqa.selenium.support.ui.WebDriverWait

class OverviewPage {

    private var driver: WebDriver

    constructor(driver: WebDriver){
        this.driver = driver
    }

    @FindBy(className = "header-title")
    private lateinit var title: WebElement

    private val SEARCH_INPUT = By.ByCssSelector(".order-search .search")
    private val SEARCH_ADD_OPTION = By.ByCssSelector(".order-search .addition")


    fun navigateTo(){
        driver.get("http://localhost:8090");
    }

    fun expectLoginModal(): LoginModal {
        val loginModal = LoginModal(driver)
        PageFactory.initElements(driver,loginModal)
        return loginModal;
    }

    fun expectLoggedIn(username: String, password: String): OverviewPage{
        val loginModal = LoginModal(driver)
        PageFactory.initElements(driver,loginModal)
        return loginModal.enterUsername(username)
                .enterPassword(password)
                .loginSuccess()
    }

    fun verifyOverviewPage(): OverviewPage {
        title.isDisplayed
        return this
    }

    fun clickEmployeeOverview(): EmployeeOverview {

        WebDriverWait(driver, 10)
        .until(elementToBeClickable(By.className("employee-overview-card")))
        .click()

        val employeeOverview = EmployeeOverview(driver)
        PageFactory.initElements(driver,employeeOverview)
        return  employeeOverview
    }

    fun clickRealEstateOverview(): RealEstateOverview{
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(By.className("realEstate-overview-card")))
                .click()
        val realEstateOverview = RealEstateOverview(driver)
        PageFactory.initElements(driver,realEstateOverview)
        return  realEstateOverview
    }

    fun clickServiceOverview(): ServiceOverview {
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(By.className("service-overview-card")))
                .click()
        val serviceOverview = ServiceOverview(driver)
        PageFactory.initElements(driver,serviceOverview)
        return  serviceOverview
    }

    fun clickOrderOverview(): OrderOverview {
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(By.className("order-overview-card")))
                .click()
        return OrderOverview(driver)
    }

    fun enterSearch(value: CharSequence): OverviewPage{
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(SEARCH_INPUT))
                .sendKeys(value)
        return this
    }

    fun executeSearch(): OrderEdit{
        WebDriverWait(driver, 10)
                .until(elementToBeClickable(SEARCH_INPUT))
                .sendKeys(Keys.ENTER)
        return OrderEdit(driver)
    }

    fun expectAddSuggestion(value: String): OverviewPage {
        var addOption = WebDriverWait(driver, 10)
                .until(elementToBeClickable(SEARCH_ADD_OPTION))
        assertThat(addOption.findElement<WebElement>(By.cssSelector(".text")).text, containsString(value))
        return this
    }


}