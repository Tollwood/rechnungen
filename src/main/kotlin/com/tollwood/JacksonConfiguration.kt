package com.tollwood

import com.fasterxml.jackson.databind.Module
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class JacksonConfiguration{

    @Bean
    fun kotlinModule(): Module {
        return KotlinModule(nullisSameAsDefault = true)
    }

}
