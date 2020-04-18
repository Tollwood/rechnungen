package com.tollwood.web

import org.apache.catalina.Context
import org.apache.catalina.connector.Connector
import org.apache.tomcat.util.descriptor.web.SecurityCollection
import org.apache.tomcat.util.descriptor.web.SecurityConstraint
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.servlet.server.ServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.handler.MappedInterceptor


@Configuration
class WebConfiguration(private val tenantInterceptor: TenantInterceptor) : WebMvcConfigurer {

    @Bean
    fun myMappedInterceptor(): MappedInterceptor? {
        return MappedInterceptor(arrayOf("/**"), tenantInterceptor)
    }

    @Bean
    fun servletContainer(@Value("\${server.port}") httpsPort: Int,@Value("\${server.httpport}") httpPort: Int): ServletWebServerFactory? {
        val tomcat: TomcatServletWebServerFactory = object : TomcatServletWebServerFactory() {
            override fun postProcessContext(context: Context) {
                val securityConstraint = SecurityConstraint()
                securityConstraint.userConstraint = "CONFIDENTIAL"
                val collection = SecurityCollection()
                collection.addPattern("/*")
                securityConstraint.addCollection(collection)
                context.addConstraint(securityConstraint)
            }
        }
        tomcat.addAdditionalTomcatConnectors(redirectConnector(httpsPort, httpPort))
        return tomcat
    }

    private fun redirectConnector(httpsPort: Int, httpPort: Int): Connector? {
        val connector = Connector(
                TomcatServletWebServerFactory.DEFAULT_PROTOCOL)
        connector.setScheme("http")
        connector.setPort(httpPort)
        connector.setSecure(false)
        connector.setRedirectPort(httpsPort)
        return connector
    }

}