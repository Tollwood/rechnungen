package com.tollwood.serviceCatalog

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "serviceCatalog", path = "service-catalog")
interface ServiceCatalogResource : PagingAndSortingRepository<ServiceCatalog, Long> {
}