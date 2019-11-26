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
        override val id: Long? = null,

        @Column(unique = true)
        val orderId: String?,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_REAL_ESTATE_FK"))
        val realEstate: RealEstate? = null,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_EMPLOYEE_FK"))
        val technician: Employee? = null,

        val firstAppointment: String? = null,
        val secondAppointment: String? = null,

        val utilisationUnit: String? = null,
        val name: String? = null,
        val location: String? = null,
        val phoneNumber: String? = null,
        val smallOrder: Boolean = false,

        @OneToMany(cascade = [CascadeType.ALL])
        @JsonManagedReference
        val services: List<ServiceOrder> = emptyList(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "order", fetch = FetchType.EAGER)
        @JsonManagedReference
        var billItems: List<BillItem> = emptyList(),

        @Enumerated(EnumType.STRING)
        val status: OrderState = ORDER_EDIT,

        @Enumerated(EnumType.STRING)
        val prevStatus: OrderState? = null,

        val includeKmFee: Boolean = true,

        val billNo: String? = null,
        val billDate: String? = null,
        val paymentRecievedDate: String? = null
) : BaseEntity() {
    @JsonProperty("sum")
    fun sum(): Number {
        return this.billItems.map { billItem -> billItem.amount * billItem.price }.sum();
    }
}