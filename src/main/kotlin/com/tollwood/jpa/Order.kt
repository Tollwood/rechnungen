package com.tollwood.jpa

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import com.tollwood.jpa.OrderState.ORDER_EDIT
import org.hibernate.search.annotations.Field
import org.hibernate.search.annotations.Indexed
import org.hibernate.search.annotations.IndexedEmbedded
import org.hibernate.search.annotations.SortableField
import javax.persistence.*

@Indexed
@Entity(name = "ORDER_TABLE")
data class Order(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        override val id: Long? = null,

        @Column(unique = true)
        @Field
        @SortableField
        val orderId: String?,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_REAL_ESTATE_FK"))
        @IndexedEmbedded
        val realEstate: RealEstate? = null,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_EMPLOYEE_FK"))
        val technician: Employee? = null,

        val firstAppointment: String? = null,
        val secondAppointment: String? = null,

        val utilisationUnit: String? = null,
        @Field
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
        @Field
        @SortableField
        val status: OrderState = ORDER_EDIT,

        @Enumerated(EnumType.STRING)
        val prevStatus: OrderState? = null,

        val includeKmFee: Boolean = true,

        @Field
        @SortableField
        val billNo: String? = null,
        val billDate: String? = null,
        val paymentRecievedDate: String? = null,
        val distance: Int? = 0,

        @IndexedEmbedded
        @Embedded
        @AttributeOverrides(AttributeOverride(name="street", column = Column(name="real_estate_street")),
                AttributeOverride(name="houseNumber", column = Column(name="real_estate_house_number")),
                AttributeOverride(name="zipCode", column = Column(name="real_estate_zip_code")),
                AttributeOverride(name="city", column = Column(name="real_estate_city")))
        val realEstateAddress: Address? = null

) :BaseEntity() {
    @JsonProperty("sum")
    fun sum(): Number {
        return this.billItems.map { billItem -> billItem.amount * billItem.price }.sum();
    }
}