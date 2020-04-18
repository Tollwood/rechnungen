package com.tollwood.web

import kotlin.concurrent.getOrSet

object ThreadTenantStorage {
    private val currentTenant = ThreadLocal<String>()

    var tenantId: String
        get() = currentTenant.getOrSet { "demo" }
        set(tenantId) {
            currentTenant.set(tenantId)
        }

    fun clear() {
        currentTenant.remove()
    }
}