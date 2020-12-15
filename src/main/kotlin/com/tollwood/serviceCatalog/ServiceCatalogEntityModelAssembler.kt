package com.tollwood.serviceCatalog

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class ServiceCatalogEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<ServiceCatalog,
        EntityModel<ServiceCatalog>> {
    override fun toModel(serviceCatalog: ServiceCatalog): EntityModel<ServiceCatalog> =
            EntityModel(serviceCatalog,
                    repositoryEntityLinks.linkForItemResource(ServiceCatalog::class.java, serviceCatalog.id as Any).withSelfRel())
}