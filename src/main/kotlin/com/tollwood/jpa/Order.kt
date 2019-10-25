package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import com.tollwood.OrderType
import com.tollwood.jpa.OrderState.ORDER_EDIT
import javax.persistence.*

@Entity(name = "ORDER_TABLE")
data class Order(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long?,

        @Column(unique = true)
        val orderId: String,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_REAL_ESTATE_FK"))
        val realEstate: RealEstate?,

        @Enumerated
        val type: OrderType?,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_EMPLOYEE_FK"))
        val technician: Employee?,

        val firstAppointment: String?,
        val secondAppointment: String?,

        val utilisationUnit: String?,
        val name: String?,
        val location: String?,
        val phoneNumber: String?,
        val smallOrder: Boolean = false,

        @OneToMany(cascade = [CascadeType.ALL])
        @JsonManagedReference
        val services: List<ServiceOrder>,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "order")
        @JsonManagedReference
        val billItems: List<BillItem>,

        @Enumerated(EnumType.STRING)
        val status: OrderState = ORDER_EDIT,

        val includeKmFee: Boolean = true,

        val billNo: String?,
        val billDate: String?,
        val paymentRecievedDate: String?
) {
    constructor(orderId: String) : this(null, orderId, null, null, null, null, null, null, null, null, null, false, emptyList<ServiceOrder>(),
            emptyList<BillItem>(), ORDER_EDIT,
            false,
            null, null, null)

    @JsonProperty("sum")
    fun sum(): Number {
        return this.billItems.map { billItem -> billItem.amount * billItem.price }.sum();
    }
}