package com.tollwood

import com.tollwood.jpa.Service
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource


@RepositoryRestResource(collectionResourceRel = "services", path = "services")
interface ArticleRepository: CrudRepository<Service, Long> {


}