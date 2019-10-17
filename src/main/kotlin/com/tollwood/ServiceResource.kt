package com.tollwood

import com.tollwood.jpa.Service
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource


@RepositoryRestResource(collectionResourceRel = "service", path = "service")
interface ServiceResource: CrudRepository<Service, Long> {


}