package com.tollwood.rechnungen


import com.tollwood.rechnungen.page.impl.OverviewPage
import io.github.bonigarcia.seljup.Arguments
import io.github.bonigarcia.seljup.SeleniumExtension
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.extension.ExtendWith
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcTemplate
import java.util.*
import java.util.concurrent.TimeUnit


@ExtendWith(SeleniumExtension::class)
@SpringBootTest
internal abstract class UiTest {

    private val testStartedAt: Date = Date()
    protected lateinit var overviewPage: OverviewPage

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Autowired
    lateinit var testData: TestData

    @BeforeEach
    fun beforeEach(driver: ChromeDriver) {

        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        this.overviewPage = OverviewPage(driver)
        this.overviewPage.navigateTo()
    }

    @AfterEach
    fun cleanUpTestData() {
        jdbcTemplate.update("delete from employee where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from real_estate where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from service where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from order_table where created_at >= ?", testStartedAt)
    }
}