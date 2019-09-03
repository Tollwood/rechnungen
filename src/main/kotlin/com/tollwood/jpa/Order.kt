package com.tollwood.jpa

import com.tollwood.OrderType
import javax.persistence.*

@Entity(name="ORDER_TABLE")
data class Order(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @Column(unique = true)
        val orderId: String,

        //@ManyToOne(optional =  false)
        //@JoinColumn(foreignKey=ForeignKey(name="ORDER_REAL_ESTATE_FK"))
        //val realEstate: RealEstate,

        @Enumerated
        val type: OrderType,

        @ManyToOne
        @JoinColumn(foreignKey=ForeignKey(name="ORDER_EMPLOYEE_FK"))
        val technician: Employee,

        // val appointmentOne: Appointment,
        // val appointmentTwo: Appointment,

        val utilisationUnit: String,
        val name: String,
        val location: String,
        val phoneNumber: String

        //@OneToMany
        //val services: List<ServiceOrder>

        )