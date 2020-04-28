package com.tollwood.web

import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.*
import javax.servlet.annotation.WebFilter
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@WebFilter("/*")
@Component
class TentantHeaderFilter : Filter {

    @Value("\${server.hostname}")
    private lateinit var hostname : String

    @Throws(IOException::class, ServletException::class)
    override fun doFilter(request: ServletRequest?, response: ServletResponse,
                          chain: FilterChain) {
        val httpServletRequest = request as HttpServletRequest
        val host = httpServletRequest.getHeader("Host")
        if (host.equals(hostname)){
            ThreadTenantStorage.tenantId = "demo"
        }else {
            val subdomain = host.removeSuffix(hostname)
            ThreadTenantStorage.tenantId = subdomain.substringBefore(".", ThreadTenantStorage.tenantId)
        }
        val httpServletResponse = response as HttpServletResponse
        httpServletResponse.setHeader("X-tenant", ThreadTenantStorage.tenantId)
        LOG.info("set X-tenant): " + ThreadTenantStorage.tenantId)
        chain.doFilter(request, response)
    }

    companion object{
        val LOG = LogFactory.getLog(javaClass)
    }
}