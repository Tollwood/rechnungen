package com.tollwood

import com.tollwood.jpa.Employee
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface UserRepository: CrudRepository<User, Long> {
    fun findByUsername(username: String): Optional<User>
}