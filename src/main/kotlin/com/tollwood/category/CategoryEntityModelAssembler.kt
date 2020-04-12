package com.tollwood.category

import com.tollwood.company.Category
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.Link
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class CategoryEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<Category,
        EntityModel<Category>> {
    override fun toModel(category: Category): EntityModel<Category> {
        val links: MutableList<Link> = ArrayList();
        links.add(repositoryEntityLinks.linkForItemResource(Category::class.java, category.id as Any).withSelfRel())
        return EntityModel(category,links)
    }
}