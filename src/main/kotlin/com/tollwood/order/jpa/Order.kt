package com.tollwood.order.jpa

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import com.tollwood.jpa.*
import com.tollwood.order.jpa.OrderState.ORDER_EDIT
import com.tollwood.realestate.jpa.RealEstate
import org.hibernate.search.annotations.*
import java.math.BigDecimal
import java.math.RoundingMode
import javax.persistence.*

@Indexed
@Entity(name = "ORDER_TABLE")
data class Order(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        override val id: Long? = null,

        @Column(unique = true)
        @Fields(value = [Field(name = "orderId_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "orderId", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "orderId")
        var orderId: String?,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_REAL_ESTATE_FK"))
        @IndexedEmbedded
        val realEstate: RealEstate? = null,

        @ManyToOne
        @JoinColumn(foreignKey = ForeignKey(name = "ORDER_EMPLOYEE_FK"))
        val technician: Employee? = null,

        @Fields(value = [Field(name = "firstAppointment_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "firstAppointment", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "firstAppointment")
        val firstAppointment: String? = null,
        val secondAppointment: String? = null,

        val utilisationUnit: String? = null,
        @Fields(value = [Field(name = "name_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
            Field(name = "name", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "name")
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
        @Fields(value = [Field(name = "status_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "status", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "status")
        val status: OrderState = ORDER_EDIT,

        @Enumerated(EnumType.STRING)
        val prevStatus: OrderState? = null,

        val includeKmFee: Boolean = true,

        @Fields(value = [Field(name = "billNo_Search", store = Store.YES, analyze = Analyze.YES, analyzer = Analyzer(definition =
        "de")),
                Field(name = "billNo", store = Store.YES, analyze = Analyze.YES, normalizer = Normalizer(definition = "lowercase"))])
        @SortableField(forField = "billNo")
        val billNo: String? = null,
        val billDate: String? = null,
        val paymentRecievedDate: String? = null,
        val distance: Int? = 0,


        val canceled: Boolean = false,

        @IndexedEmbedded
        @Embedded
        @AttributeOverrides(AttributeOverride(name="street", column = Column(name="real_estate_street")),
                AttributeOverride(name="houseNumber", column = Column(name="real_estate_house_number")),
                AttributeOverride(name="zipCode", column = Column(name="real_estate_zip_code")),
                AttributeOverride(name="city", column = Column(name="real_estate_city")))
        val realEstateAddress: Address? = null,

        @IndexedEmbedded
        @Embedded
        @AttributeOverrides(
                AttributeOverride(name="salutation", column = Column(name="customer_salutation")),
                AttributeOverride(name="firstName", column = Column(name="customer_firstname")),
                AttributeOverride(name="lastName", column = Column(name="customer_lastname")),
                AttributeOverride(name="phoneNumber", column = Column(name="customer_phonenumber")),
                AttributeOverride(name="address.street", column = Column(name="customer_street")),
                AttributeOverride(name="address.houseNumber", column = Column(name="customer_house_number")),
                AttributeOverride(name="address.zipCode", column = Column(name="customer_zip_code")),
                AttributeOverride(name="address.city", column = Column(name="customer_city")))
        val customer: Customer? = null

) : BaseEntity() {
    @JsonProperty("sum")
    fun sum(): Number {
            return this.billItems.map { billItem -> billItem.amount * billItem.price }.sum().round(2)
    }

    fun Double.round(decimals: Int = 2): Double =  BigDecimal(this).setScale(decimals, RoundingMode.HALF_EVEN).toDouble()
}