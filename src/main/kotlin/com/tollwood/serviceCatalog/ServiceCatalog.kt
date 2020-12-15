package com.tollwood.serviceCatalog

import com.tollwood.jpa.BaseEntity
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.AUTO
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Entity(name = "SERVICE_CATALOG")
data class ServiceCatalog(
        @Id
        @GeneratedValue(strategy = AUTO)
        override val id: Long,

        @Column(name = "id", updatable = false, insertable = false)
        val idValue:Long,

        @NotNull
        val name: String
       ) : BaseEntity()