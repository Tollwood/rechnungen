package com.tollwood.jpa

import javax.persistence.Embeddable

@Embeddable
data class BankDetails (
        val bankName: String,
        val iban: String,
        val bic: String
)