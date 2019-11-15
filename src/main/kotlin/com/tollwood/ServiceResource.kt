package com.tollwood

import com.tollwood.jpa.Service
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*


@RepositoryRestResource(collectionResourceRel = "service", path = "service")
interface ServiceResource : PagingAndSortingRepository<Service, Long> {
    fun findByArticleNumber(articleNumber: String?): Optional<Service>
}