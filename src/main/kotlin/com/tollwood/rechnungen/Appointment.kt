package com.tollwood.rechnungen

import java.util.*
import javax.persistence.Embeddable

@Embeddable
data class Appointment (
        val start: Date,
        val end: Date
        )
