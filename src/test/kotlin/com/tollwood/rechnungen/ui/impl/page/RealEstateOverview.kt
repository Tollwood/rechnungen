package com.tollwood.rechnungen.ui.impl.page

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.ui.ExpectedConditions.numberOfElementsToBe
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class RealEstateOverview(private var driver: WebDriver) {


    val ROW_SELECTOR = By.ByCssSelector(".realEstate-list > tbody > tr")
    val ADD_BTTN = By.ByCssSelector(".add")

    val REALESTATE_OVERVIEW = By.cssSelector(".realEstate-overview")

    @FindBy(className = "menu-title")
    lateinit var title: WebElement

    fun expectNRows(n: Number): RealEstateOverview {
        WebDriverWait(driver, 2)
                .until(numberOfElementsToBe(ROW_SELECTOR, n.toInt()))
        return this
    }

    fun verifyOnRealEstateOverviewPage(): RealEstateOverview {
        WebDriverWait(driver, 2)
                .until(presenceOfElementLocated(REALESTATE_OVERVIEW))
        return this
    }

    fun verifyPageContent(): RealEstateOverview {
        title.isDisplayed
        assertThat(title.text, equalTo("Liegenschaften"))
        return this
    }

    fun clickAdd(): RealEstateEdit {
        driver.findElement<WebElement>(ADD_BTTN).click()
        return RealEstateEdit(driver)
    }

    fun selectByName(name: String?): RealEstateEdit {
        driver.findElement<WebElement>(By.ByCssSelector(".realEstate-list ."+ name?.replace(" ",""))).click()
        return RealEstateEdit(driver)
    }
}
