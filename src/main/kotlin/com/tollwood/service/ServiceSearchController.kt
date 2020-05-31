package com.tollwood.service

import com.tollwood.realestate.BaseSearchController
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
class ServiceSearchController : BaseSearchController<Service>() {

    @Autowired
    lateinit var entityModelAssembler: RepresentationModelAssembler<Service, EntityModel<Service>>

    @RequestMapping("/api/service/search")
    override fun search(@RequestParam(value = "term", required = false) term: String?,
                        @RequestParam(value = "page", defaultValue = "0", required = false) page: Int,
                        @RequestParam(value = "sort", required = false) sort: String?,
                        @RequestParam(value = "size", defaultValue = "50", required = false) size: Int,
                        @Autowired pagedResourcesAssembler: PagedResourcesAssembler<Service>): ResponseEntity<PagedModel<EntityModel<Service>>> {
        return super.search(term, page, sort, size, pagedResourcesAssembler)
    }

    override fun getModelAssembler(): RepresentationModelAssembler<Service, EntityModel<Service>> {
        return entityModelAssembler;
    }

    override fun getCurrentClass(): Class<Service> {
        return Service::class.java
    }

    override fun getSortFieldType(sortField: String): SortField.Type {
        var sortFieldType = SortField.Type.STRING
        if (sortField == "price") {
            sortFieldType = SortField.Type.DOUBLE
        }
        return sortFieldType
    }

    override fun getSearchFields(): List<String> {
        return listOf("title_Search", "articleNumber_Search")
    }
}