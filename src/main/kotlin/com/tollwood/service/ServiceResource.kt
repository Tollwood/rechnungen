package com.tollwood.service

import com.tollwood.company.Company
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*


@RepositoryRestResource(collectionResourceRel = "service", path = "service")
interface ServiceResource : PagingAndSortingRepository<Service, Long> {
    fun findByArticleNumber(articleNumber: String?): Optional<Service>
}