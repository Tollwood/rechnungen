package com.tollwood

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

fun mainx() {
    val bCryptPasswordEncoder = BCryptPasswordEncoder()
    val bcryptencodedPassword = bCryptPasswordEncoder.encode("1234")
    println(bcryptencodedPassword)
    println(bCryptPasswordEncoder.matches("1234",bcryptencodedPassword))
}