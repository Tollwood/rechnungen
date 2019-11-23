package com.tollwood.rechnungen.unit

import com.tollwood.BillService
import com.tollwood.ServiceResource
import com.tollwood.jpa.BillItem
import com.tollwood.jpa.Order
import com.tollwood.jpa.ServiceOrder
import com.tollwood.rechnungen.TestData
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.util.Lists
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.util.*

@RunWith(SpringRunner::class)
@SpringBootTest
class BillServiceTest {


    @Autowired
    lateinit var billService: BillService

    @Autowired
    lateinit var testData: TestData

    @Autowired
    lateinit var serviceResource: ServiceResource

    companion object {
        @JvmStatic
        fun distanceCodeMapping() = listOf(
                Arguments.of(21, "1B", 1),
                Arguments.of(31, "1C", 1),
                Arguments.of(41, "1D", 1),
                Arguments.of(51, "1E", 51)
        )
    }

    @Test
    fun `empty order`() {
        // given
        val order = Order(orderId = "1234")

        // when
        val billItems = billService.computeBillItems(order)

        // then
        assertThat(billItems.size).isEqualTo(1)
        assertBasePriceItem(billItems)

    }

    @ParameterizedTest
    @MethodSource("distanceCodeMapping")
    fun `order with distance`(distance: Int, expectedCode: String, price: Double) {

        // given
        val order = Order(orderId = "1234", realEstate = testData.givenRealEstate(distance))
        val realPrice = serviceResource.findByArticleNumber(expectedCode).get().price!! * price

        // when
        val billItems = billService.computeBillItems(order)

        // then
        assertThat(billItems.size).isEqualTo(2)
        assertBasePriceItem(billItems)
        assertDistanceItem(billItems, expectedCode, realPrice)
    }

    @Test
    fun `without km inclueded`() {
        // given
        val order = Order(orderId = "1234", realEstate = testData.givenRealEstate(99), includeKmFee = false)

        // when
        val billItems = billService.computeBillItems(order)

        // then
        assertThat(billItems.size).isEqualTo(1)
        assertBasePriceItem(billItems)
    }

    @Test
    fun `with services`() {
        val order = Order(id = 1, orderId = "1234")
        // given
        val serviceOrders = Lists.newArrayList<ServiceOrder>()

        testData.givenAdditionalService(order, "6A", 1).let { serviceOrders.add(it) }
        testData.givenAdditionalService(order, "6B", 2).let { serviceOrders.add(it) }
        testData.givenAdditionalService(order, "6C", 3).let { serviceOrders.add(it) }
        testData.givenAdditionalService(order, "5A", 4).let { serviceOrders.add(it) }


        // when
        val billItems = billService.computeBillItems(order.copy(services = serviceOrders))

        // then
        assertThat(billItems.size).isEqualTo(serviceOrders.size + 1)
        assertBasePriceItem(billItems)
        assertServiceItems(billItems, serviceOrders)

    }

    private fun assertServiceItems(billItems: List<BillItem>, serviceOrders: ArrayList<ServiceOrder>) {
        for (so in serviceOrders) {
            assertThat(billItems.filter { billItem -> billItem.id.code == so.service.articleNumber }.count()).isEqualTo(1)
            val billItem = billItems.filter { billItem -> billItem.id.code == so.service.articleNumber }.get(0)
            assertThat(billItem.price).isEqualTo(so.service.price)
            assertThat(billItem.serviceName).isEqualTo(so.service.title)
            assertThat(billItem.amount).isEqualTo(so.amount)
            assertThat(billItem.order.id).isEqualTo(so.order.id)
        }
    }

    private fun assertDistanceItem(billItems: List<BillItem>, expectedCode: String, price: Double) {
        assertThat(billItems.filter { billItem -> billItem.id.code == expectedCode }.count()).isEqualTo(1)
        assertThat(billItems.filter { billItem -> billItem.id.code == expectedCode }.first().price).isEqualTo(price)
    }

    private fun assertBasePriceItem(billItems: List<BillItem>) {
        assertThat(billItems.filter { billItem -> billItem.id.code == "1A" }.count()).isEqualTo(1)
    }

}