package com.tollwood.rechnungen.ui.page

import com.tollwood.jpa.RealEstate
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class RealEstateEdit(private var driver: WebDriver) {
    val REAL_ESTATE_EDIT = By.cssSelector(".realEstate-edit")

    val SAVE_BTTN = By.cssSelector(".save-bttn")
    val CANCEL_BTTN = By.cssSelector(".cancel-bttn")
    val DELETE_BTTN = By.cssSelector(".delete-bttn")
    val CLOSE_BTTN = By.cssSelector(".close")


    val NAME_INPUT = By.cssSelector("#name")
    val DISTANCE_INPUT = By.cssSelector("#distance")

    fun verifyOnRealEstateEditPage(): RealEstateEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(REAL_ESTATE_EDIT))
        return this
    }

    fun clickCancel(): RealEstateOverview {
        driver.findElement<WebElement>(CANCEL_BTTN).click()
        return RealEstateOverview(driver)
    }

    fun clickClose(): OverviewPage {
        driver.findElement<WebElement>(CLOSE_BTTN).click()
        val overviewPage = OverviewPage(driver)
        PageFactory.initElements(driver, overviewPage)
        return overviewPage
    }

    fun clickSaveSuccess(): RealEstateOverview {
        driver.findElement<WebElement>(SAVE_BTTN).click()
        return RealEstateOverview(driver)
    }

    fun enterRealEstateeData(newRealEstate: RealEstate): RealEstateEdit {
        driver.findElement<WebElement>(NAME_INPUT).sendKeys(newRealEstate.name)
        driver.findElement<WebElement>(DISTANCE_INPUT).sendKeys(newRealEstate.distance.toString())
        AddressEdit.enterAddressData(driver, newRealEstate.address)
        return this
    }

    fun clickDelete(): RealEstateOverview {
        driver.findElement<WebElement>(DELETE_BTTN).click()
        return RealEstateOverview(driver)
    }

}
