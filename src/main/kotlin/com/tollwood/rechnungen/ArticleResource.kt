package com.tollwood.rechnungen

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource


@RepositoryRestResource(collectionResourceRel = "article", path = "article")
interface ArticleRepository: PagingAndSortingRepository<Article, Long> {


}