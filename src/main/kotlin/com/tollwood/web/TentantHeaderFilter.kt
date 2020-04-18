package com.tollwood.web

import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.*
import javax.servlet.annotation.WebFilter
import javax.servlet.http.HttpServletResponse


@WebFilter("/*")
@Component
class TentantHeaderFilter : Filter {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(request: ServletRequest?, response: ServletResponse,
                          chain: FilterChain) {
        val httpServletResponse = response as HttpServletResponse
        httpServletResponse.setHeader("X-tenant", ThreadTenantStorage.tenantId)
        chain.doFilter(request, response)
    }
}