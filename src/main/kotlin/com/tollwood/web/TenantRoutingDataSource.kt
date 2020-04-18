package com.tollwood.web

import com.tollwood.web.ThreadTenantStorage.tenantId
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource


class TenantRoutingDataSource : AbstractRoutingDataSource() {
    override fun determineCurrentLookupKey(): Any? {
        return tenantId
    }
}