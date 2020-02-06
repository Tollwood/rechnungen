package com.tollwood

import com.tollwood.jpa.BillItem
import com.tollwood.jpa.DependentId
import com.tollwood.order.jpa.Order
import com.tollwood.jpa.Service
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import java.lang.IllegalStateException
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
        addDistanceItem(order)?.let { billItems.addAll(it) }
        smallOrder(order)?.let { billItems.add(it) }

        order.services
                .map { serviceOrder ->
                    BillItem(id = DependentId(serviceOrder.service.articleNumber ?: "", order.id),
                            amount = serviceOrder.amount,
                            serviceName = serviceOrder.service.title,
                            price = serviceOrder.service.price ?: 0.0, order = order)
                }
                .let { billItems.addAll(it) }
        return billItems
    }

    private fun addDistanceItem(order: Order): List<BillItem> {

        if (!order.includeKmFee || order.realEstate == null){
            return emptyList()
        }

        val distance = order.realEstate.distance;
        if (distance in 21..30) {
            return listOf(this.getDistanceItem(order, "1B"))
        }
        if (distance in 31..40) {
            return listOf(this.getDistanceItem(order, "1C"))
        }
        if (distance in 41..50) {
            return listOf(this.getDistanceItem(order, "1D"))
        }

        if (distance > 50) {
            return listOf(
                    this.getDistanceItem(order, "1D"),
                    this.getDistanceItem(order, "1E", distance - 50))
        }

        return emptyList()
    }

    private fun getDistanceItem(order: Order, code: String, distance: Int = 1): BillItem {
        val service: Optional<Service> = serviceResource.findByArticleNumber(code)
        if (service.isPresent) {
            return BillItem(id = DependentId(service.get().articleNumber ?: "", order.id), amount = distance, serviceName = service.get().title,
                    price = service.get().price ?: 0.0, order = order);
        }
        return throw IllegalStateException("Service Item with code: " + code + " not found")
    }

    private fun basePrice(order: Order): BillItem? {
        val service: Optional<Service> = serviceResource.findByArticleNumber("1A")
        if (service.isPresent) {
            return BillItem(id = DependentId(service.get().articleNumber ?: "", order.id), amount = 1, serviceName = service.get().title,
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
            return BillItem(id = DependentId(service.get().articleNumber ?: "", order.id), amount = 1, serviceName = service.get().title,
                    price = service.get().price ?: 0.0, order = order);
        }
        return null;
    }

}