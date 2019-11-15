package com.tollwood

import com.tollwood.jpa.Employee
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*


@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
interface EmployeeResource: PagingAndSortingRepository<Employee, Long> {
    fun findByTechnicianId(technicianId: String?): Optional<Employee>
}