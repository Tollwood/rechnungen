package com.tollwood.rechnungen.page.impl

import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable
import org.openqa.selenium.support.ui.WebDriverWait

class OverviewPage {

    private var driver: WebDriver

    constructor(driver: WebDriver){
        this.driver = driver
    }

    @FindBy(className = "header-title")
    private lateinit var title: WebElement

    @FindBy(className = "order-search")
    private lateinit var search: WebElement

    @FindBy(className = "order-overview-card")
    private lateinit var orderOverview: WebElement

    @FindBy(className = "employee-overview-card")
    private lateinit var employeeOverviewCard: WebElement

    @FindBy(className = "realEstate-overview-card")
    private lateinit var realEstateOvervieww: WebElement

    @FindBy(className = "service-overview-card")
    private lateinit var serviceOverview: WebElement

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
        search.isDisplayed
        orderOverview.isDisplayed
        employeeOverviewCard.isDisplayed
        serviceOverview.isDisplayed
        realEstateOvervieww.isDisplayed
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
}