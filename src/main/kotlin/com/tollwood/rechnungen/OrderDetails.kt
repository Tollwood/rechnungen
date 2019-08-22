package com.tollwood.rechnungen

import javax.persistence.*

@Entity(name="ORDER_DETAILS")
data class OrderDetails (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,
        val orderNumber: String,
        val orderType: String,
        val lgNumber: String,
        val distance: Double,
        val ne: String,
        val nameNe: String,
        val abbreviation: String,
        val address: Address,

        @AttributeOverrides(
                AttributeOverride(name = "start", column = Column(name = "FIRST_APPOINTMENT_START")),
                AttributeOverride(name = "end", column = Column(name = "FIRST_APPOINTMENT_END"))
            )
        val firstAppointment: Appointment,

        @AttributeOverrides(
                AttributeOverride(name = "start", column = Column(name = "SECOND_APPOINTMENT_START")),
                AttributeOverride(name = "end", column = Column(name = "SECOND_APPOINTMENT_END"))
        )
        val secondAppointment: Appointment
        )
