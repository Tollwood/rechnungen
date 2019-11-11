package com.tollwood.jpa

import org.jetbrains.annotations.NotNull
import javax.persistence.Embeddable

@Embeddable
data class BankDetails(
        @NotNull
        val bankName: String,
        @NotNull
        val iban: String,
        @NotNull
        val bic: String
)