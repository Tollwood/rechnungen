package com.tollwood.realestate

import com.tollwood.realestate.jpa.RealEstate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.stereotype.Component

@Component
class RealEstateEntityModelAssembler(@Autowired val repositoryEntityLinks: RepositoryEntityLinks) : RepresentationModelAssembler<RealEstate,
        EntityModel<RealEstate>> {
    override fun toModel(realEstate: RealEstate): EntityModel<RealEstate> =
            EntityModel(realEstate,
                    repositoryEntityLinks.linkForItemResource(RealEstate::class.java, realEstate.id as Any).withSelfRel())
}