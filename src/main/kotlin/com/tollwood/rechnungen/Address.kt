package com.tollwood.rechnungen

import javax.persistence.Embeddable

@Embeddable
data class Address(val street: String, val housenumber: String, val zipCode: String, val city: String){

}