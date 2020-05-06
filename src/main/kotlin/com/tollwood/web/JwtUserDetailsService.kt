package com.tollwood.web

import com.tollwood.EmployeeResource
import com.tollwood.UserRepository
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
    private lateinit var userResource: UserRepository

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userResource.findByUsername(username)
        if (user.isPresent()) {
            return User(user.get().username, user.get().password, Collections.emptyList())
        } else {
            throw UsernameNotFoundException("User not found");
        }
    }

}