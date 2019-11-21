package com.tollwood

import com.tollwood.jpa.BillItem
import com.tollwood.jpa.Order
import com.tollwood.jpa.Service
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import java.util.*
import kotlin.collections.ArrayList

@RepositoryEventHandler(Order::class)
class BillService(@Autowired val serviceResource: ServiceResource) {

    @HandleBeforeSave
    @HandleBeforeCreate
    fun updateBillItems(order: Order) {
        order.billItems = computeBillItems(order)
    }

    fun computeBillItems(order: Order): List<BillItem> {
        val billItems = ArrayList<BillItem>()
        basePrice(order)?.let { billItems.add(it) }
        addDistanceItem(order)?.let { billItems.add(it) }
        smallOrder(order)?.let { billItems.add(it) }

        order.services
                .map { serviceOrder ->
                    BillItem(code = serviceOrder.service.articleNumber ?: "", amount = 1, serviceName = serviceOrder.service.title,
                            price = serviceOrder.service.price ?: 0.0, order = order)
                }
                .let { billItems.addAll(it) }
        return billItems
    }

    private fun addDistanceItem(order: Order): BillItem? {

        if (!order.includeKmFee || order.realEstate == null){
            return null
        }

        val distance = order.realEstate.distance;
        if (distance in 21..30) {
            return this.getDistanceItem(order, "1B");
        }
        if (distance in 31..40) {
            return this.getDistanceItem(order, "1C");
        }
        if (distance in 41..50) {
            return this.getDistanceItem(order, "1D");
        }
        if (distance > 50) {
            return this.getDistanceItem(order, "1E", distance);
        }

        return null
    }

    private fun getDistanceItem(order: Order, code: String, distance: Int = 1): BillItem? {
        val service: Optional<Service> = serviceResource.findByArticleNumber(code)
        if (service.isPresent) {
            return BillItem(code = service.get().articleNumber ?: "", amount = 1, serviceName = service.get().title,
                    price = (service.get().price ?: 0.0) * distance, order = order);
        }
        return null
    }

    private fun basePrice(order: Order): BillItem? {
        val service: Optional<Service> = serviceResource.findByArticleNumber("1A")
        if (service.isPresent) {
            return BillItem(code = service.get().articleNumber ?: "", amount = 1, serviceName = service.get().title,
                    price = service.get().price ?: 0.0, order = order);
        }
        return null;
    }

    private fun smallOrder(order: Order): BillItem? {

        if (!order.smallOrder) {
            return null;
        }

        val service: Optional<Service> = serviceResource.findByArticleNumber("1F")
        if (service.isPresent) {
            return BillItem(code = service.get().articleNumber ?: "", amount = 1, serviceName = service.get().title,
                    price = service.get().price ?: 0.0, order = order);
        }
        return null;
    }

}