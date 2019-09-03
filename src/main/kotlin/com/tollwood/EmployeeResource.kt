package com.tollwood

import com.tollwood.jpa.Employee
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource


@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
interface EmployeeResource: PagingAndSortingRepository<Employee, Long> {


}