package com.tollwood.jpa

import javax.persistence.*
import javax.validation.constraints.NotNull

@Table(name="INSTRUMENTATION")
data class Instrumentation(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        @NotNull
        val amount: Int,

        @NotNull
        @ManyToOne
        val type: InstrumentationType
)