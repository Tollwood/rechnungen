package com.tollwood

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RepositoryHandlerConfiguration {

    @Bean
    fun billService(@Autowired serviceResource: ServiceResource): BillService{
        return BillService(serviceResource)
    }
}