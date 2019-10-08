package com.tollwood.web

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*


@Service
class JwtUserDetailsService : UserDetailsService {

    @Autowired
    private lateinit var bcryptEncoder: PasswordEncoder

    @Value("\${user.username}")
    private lateinit var defaultUsername: String

    @Value("\${user.password}")
    private lateinit var defaultPassword: String

    override fun loadUserByUsername(username: String): UserDetails {
        if (defaultUsername.equals(username)) {
            return User(defaultUsername, bcryptEncoder.encode(defaultPassword), Collections.emptyList())
        } else {
            throw UsernameNotFoundException("User not found");
        }
    }

}