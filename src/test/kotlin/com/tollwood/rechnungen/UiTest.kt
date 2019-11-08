package com.tollwood.rechnungen


import com.tollwood.rechnungen.page.impl.OverviewPage
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.extension.ExtendWith
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.util.*
import java.util.concurrent.TimeUnit


@ExtendWith(SeleniumExtension::class)
@SpringBootTest
abstract class UiTest : DataTest() {

    private val testStartedAt: Date = Date()
    protected lateinit var overviewPage: OverviewPage

    @Autowired
    lateinit var testData: TestData

    @BeforeEach
    fun beforeEach(driver: ChromeDriver) {

        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        this.overviewPage = OverviewPage(driver)
        this.overviewPage.navigateTo()
    }
}