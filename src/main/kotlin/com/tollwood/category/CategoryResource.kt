package com.tollwood.company

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "category", path = "category")
interface CategoryResource : PagingAndSortingRepository<Category, Long> {

}