package com.tollwood.order.jpa

enum class OrderState(val order:Int) {

    ORDER_EDIT(0),
    ORDER_EXECUTE(1),
    ORDER_BILL(2),
    ORDER_BILL_RECIEVED(3),
    PAYMENT_RECIEVED(4);
}
