package com.tollwood

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Entity(name = "APP_USER")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @NotNull
        val username: String,
        @NotNull
        val password: String)