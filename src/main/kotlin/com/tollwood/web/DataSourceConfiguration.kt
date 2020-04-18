package com.tollwood.web

import org.flywaydb.core.Flyway
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.annotation.PostConstruct
import javax.sql.DataSource


@Configuration
class DataSourceConfiguration(private val dataSourceProperties: DataSourceProperties) {
    @Bean
    fun dataSource(): DataSource {
        val customDataSource = TenantRoutingDataSource()
        customDataSource.setTargetDataSources(
                dataSourceProperties.getDatasources())
        return customDataSource
    }

    @PostConstruct
    fun migrate() {
        for (dataSource in dataSourceProperties
                .getDatasources()
                .values) {
            val source = dataSource as DataSource
            val flyway = Flyway.configure().dataSource(source).load()
            flyway.migrate()
        }
    }

}