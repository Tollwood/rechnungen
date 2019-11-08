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
abstract class DataTest {

    private val testStartedAt: Date = Date()

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @AfterEach
    fun cleanUpTestData() {
        jdbcTemplate.update("delete from employee where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from real_estate where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from service where created_at >= ?", testStartedAt)
        jdbcTemplate.update("delete from order_table where created_at >= ?", testStartedAt)
    }
}