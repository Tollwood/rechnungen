package com.tollwood.jpa

import org.springframework.data.annotation.CreatedDate
import java.util.*
import javax.persistence.MappedSuperclass
import javax.persistence.PrePersist
import javax.persistence.Temporal
import javax.persistence.TemporalType

@MappedSuperclass
abstract class BaseEntity{
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    protected lateinit var createdAt: Date

    @PrePersist
    fun setCreatedDate(){
        this.createdAt = Date()
    }
}