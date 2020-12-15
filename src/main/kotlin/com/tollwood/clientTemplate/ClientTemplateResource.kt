package com.tollwood.clientTemplate

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource



@RepositoryRestResource(collectionResourceRel = "clientTemplate", path = "client-template")
interface ClientTemplateResource : PagingAndSortingRepository<ClientTemplate, Long> {
}