package com.tollwood.rechnungen.unit

import com.tollwood.BillService
import com.tollwood.ServiceResource
import com.tollwood.jpa.Address
import com.tollwood.jpa.BillItem
import com.tollwood.jpa.Order
import com.tollwood.jpa.RealEstate
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class BillServiceTest {


    @Autowired
    lateinit var billService: BillService

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
        val order = Order(orderId = "1234", realEstate = givenRealEstate(distance))
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
        val order = Order(orderId = "1234", realEstate = givenRealEstate(99), includeKmFee = false)

        // when
        val billItems = billService.computeBillItems(order)

        // then
        assertThat(billItems.size).isEqualTo(1)
        assertBasePriceItem(billItems)
    }

    private fun givenRealEstate(distance: Int): RealEstate {
        return RealEstate(distance = distance, address = Address("", "", "", ""), name = "realEstate")
    }

    private fun assertDistanceItem(billItems: List<BillItem>, expectedCode: String, price: Double) {
        assertThat(billItems.filter { billItem -> billItem.code == expectedCode }.count()).isEqualTo(1)
        assertThat(billItems.filter { billItem -> billItem.code == expectedCode }.first().price).isEqualTo(price)
    }

    private fun assertBasePriceItem(billItems: List<BillItem>) {
        assertThat(billItems.filter { billItem -> billItem.code == "1A" }.count()).isEqualTo(1)
    }

}