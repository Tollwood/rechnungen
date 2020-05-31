package com.tollwood.realestate

import com.tollwood.realestate.jpa.RealEstate
import org.apache.lucene.search.SortField
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.web.PagedResourcesAssembler
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.PagedModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class RealEstateSearchController : BaseSearchController<RealEstate>() {

    @Autowired
    lateinit var realEstateEntityModelAssembler: RepresentationModelAssembler<RealEstate, EntityModel<RealEstate>>

    @RequestMapping("/api/realestates/search")
    override fun search(@RequestParam(value = "term", required = false) term: String?,
                        @RequestParam(value = "page", defaultValue = "0", required = false) page: Int,
                        @RequestParam(value = "sort", required = false) sort: String?,
                        @RequestParam(value = "size", defaultValue = "50", required = false) size: Int,
                        @Autowired pagedResourcesAssembler: PagedResourcesAssembler<RealEstate>): ResponseEntity<PagedModel<EntityModel<RealEstate>>> {
        return super.search(term, page, sort, size, pagedResourcesAssembler)
    }

    override fun getModelAssembler(): RepresentationModelAssembler<RealEstate, EntityModel<RealEstate>> {
        return realEstateEntityModelAssembler;
    }

    override fun getCurrentClass(): Class<RealEstate> {
        return RealEstate::class.java
    }

    override fun getSortFieldType(sortField: String): SortField.Type {
        var sortFieldType = SortField.Type.STRING
        if (sortField == "distance") {
            sortFieldType = SortField.Type.INT
        }
        return sortFieldType
    }

    override fun getSearchFields(): List<String> {
        return listOf("name_Search", "address.city_Search", "address.street_Search", "address.zipCode_Search")
    }

}