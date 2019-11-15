package com.tollwood

import com.tollwood.jpa.RealEstate
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.*


@RepositoryRestResource(collectionResourceRel = "realestate", path = "realestate")
interface RealestateResource: PagingAndSortingRepository<RealEstate, Long> {

    fun findByName(name: String?): Optional<RealEstate>
}