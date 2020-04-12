package com.tollwood.web

import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.stereotype.Component


@Component
class SpringDataRestCustomization : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        config.corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
    }
}