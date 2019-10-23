package com.tollwood.jpa

import org.jetbrains.annotations.NotNull
import org.springframework.data.annotation.CreatedDate
import java.util.*
import javax.persistence.*


@Entity(name = "EMPLOYEE")
data class Employee (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        val firstName: String,
        val lastName: String,
        @Embedded
        val address: Address,
        val taxIdent: String,
        @NotNull
        val technicianId: String,
        @CreatedDate
        @Temporal(TemporalType.TIMESTAMP)
        var createdAt: Date?

){
        @PrePersist
        fun setCreatedDate(){
                this.createdAt = Date()
        }
}