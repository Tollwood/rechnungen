package com.tollwood.company

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.Link
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class CompanyEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<Company,
        EntityModel<Company>> {
    override fun toModel(company: Company): EntityModel<Company> {
        val links: MutableList<Link> = ArrayList();
        links.add(repositoryEntityLinks.linkForItemResource(Company::class.java, company.id as Any).withSelfRel())
        return EntityModel(company,links)
    }
}