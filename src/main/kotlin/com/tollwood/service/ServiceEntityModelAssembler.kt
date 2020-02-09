package com.tollwood.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class ServiceEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<Service,
        EntityModel<Service>> {
    override fun toModel(service: Service): EntityModel<Service> =
            EntityModel(service,
                    repositoryEntityLinks.linkForItemResource(Service::class.java, service.id as Any).withSelfRel())
}