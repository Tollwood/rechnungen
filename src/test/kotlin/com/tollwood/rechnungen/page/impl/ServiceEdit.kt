package com.tollwood.rechnungen.page.impl

import com.tollwood.jpa.Service
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.PageFactory
import org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated
import org.openqa.selenium.support.ui.WebDriverWait

class ServiceEdit(private var driver: WebDriver) {
    val SERVICE_EDIT = By.cssSelector(".service-edit")

    val CANCEL_BTTN = By.cssSelector(".cancel-bttn")
    val SAVE_BTTN = By.cssSelector(".save-bttn")
    val CLOSE_BTTN = By.cssSelector(".close")


    val ARTICLE_NUMBER_INPUT = By.cssSelector("#articleNumber")
    val TITLE_INPUT = By.cssSelector("#title")
    val PRICE_INPUT = By.cssSelector("#price")
    val SELECTABLE_CHECKBOX = By.cssSelector("label[for='selectable']")

    fun verifyOnServiceEditPage(): ServiceEdit {
        WebDriverWait(driver, 10)
                .until(presenceOfElementLocated(SERVICE_EDIT))
        return this
    }

    fun clickCancel(): ServiceOverview {
        driver.findElement<WebElement>(CANCEL_BTTN).click()
        return ServiceOverview(driver)
    }

    fun clickClose(): OverviewPage {
        driver.findElement<WebElement>(CLOSE_BTTN).click()
        val overviewPage = OverviewPage(driver)
        PageFactory.initElements(driver, overviewPage)
        return overviewPage
    }

    fun clickSaveSuccess(): ServiceEdit {
        driver.findElement<WebElement>(SAVE_BTTN).click()
        return this
    }

    fun enterServiceData(service: Service): ServiceEdit {
        driver.findElement<WebElement>(ARTICLE_NUMBER_INPUT).sendKeys(service.articleNumber)
        driver.findElement<WebElement>(TITLE_INPUT).sendKeys(service.title)
        driver.findElement<WebElement>(PRICE_INPUT).sendKeys(service.price.toString())
        if(service.selectable){
            driver.findElement<WebElement>(SELECTABLE_CHECKBOX).click()
        }
        return this
    }

}
