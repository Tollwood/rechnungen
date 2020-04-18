package com.tollwood.web

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter
import java.net.URI
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Component
class TenantInterceptor : HandlerInterceptorAdapter() {

    @Value("\${server.hostname}")
    private lateinit var hostname : String


    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val host = URI(request.requestURL.toString()).host
        val subdomain = host.removeSuffix(hostname)

        ThreadTenantStorage.tenantId = subdomain.substringBefore(".", ThreadTenantStorage.tenantId)
        return true
    }

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(TenantInterceptor::class.java)
    }
}