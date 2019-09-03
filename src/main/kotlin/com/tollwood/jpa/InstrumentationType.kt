package com.tollwood.jpa

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotNull

@Entity(name="INSTRUMENTATION_TYPE")
data class InstrumentationType (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @NotNull
    val name: String
)
