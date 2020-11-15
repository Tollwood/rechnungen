package com.tollwood

import com.tollwood.jpa.Company
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

@RepositoryRestResource(collectionResourceRel = "company", path = "company")
interface CompanyResource : PagingAndSortingRepository<Company, Long> {


    @Query("Select c from COMPANY c Where c.id = 1")
    @RestResource(path = "/company/1")
    fun getCurrent(): Company

}