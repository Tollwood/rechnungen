package com.tollwood.rechnungen.ui.page

import com.tollwood.jpa.Address
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

class AddressEdit {

    companion object {

        val STREET_INPUT = By.cssSelector("#street")
        val HOUSENUMBER_INPUT = By.cssSelector("#houseNumber")
        val ZIPCODE_INPUT = By.cssSelector("#zipCode")
        val CITY_INPUT = By.cssSelector("#city")

        @JvmStatic
        fun  enterAddressData(driver: WebDriver,newAddress: Address) {
            driver.findElement<WebElement>(STREET_INPUT).sendKeys(newAddress.street)
            driver.findElement<WebElement>(HOUSENUMBER_INPUT).sendKeys(newAddress.houseNumber)
            driver.findElement<WebElement>(ZIPCODE_INPUT).sendKeys(newAddress.zipCode)
            driver.findElement<WebElement>(CITY_INPUT).sendKeys(newAddress.city)

        }
    }
}
