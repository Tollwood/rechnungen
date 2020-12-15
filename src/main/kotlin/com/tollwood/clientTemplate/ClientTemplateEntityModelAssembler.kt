package com.tollwood.clientTemplate

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class ClientTemplateEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<ClientTemplate,
        EntityModel<ClientTemplate>> {
    override fun toModel(serviceCatalog: ClientTemplate): EntityModel<ClientTemplate> =
            EntityModel(serviceCatalog,
                    repositoryEntityLinks.linkForItemResource(ClientTemplate::class.java, serviceCatalog.id as Any).withSelfRel())
}