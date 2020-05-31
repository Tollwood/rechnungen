package com.tollwood.category

import com.tollwood.company.Category
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
class CategorySearchController : BaseSearchController<Category>() {

    @Autowired
    lateinit var entityModelAssembler: RepresentationModelAssembler<Category, EntityModel<Category>>

    @RequestMapping("/api/categories/search")
    override fun search(@RequestParam(value = "term", required = false) term: String?,
                        @RequestParam(value = "page", defaultValue = "0", required = false) page: Int,
                        @RequestParam(value = "sort", required = false) sort: String?,
                        @RequestParam(value = "size", defaultValue = "50", required = false) size: Int,
                        @Autowired pagedResourcesAssembler: PagedResourcesAssembler<Category>): ResponseEntity<PagedModel<EntityModel<Category>>> {
        return super.search(term, page, sort, size, pagedResourcesAssembler)
    }

    override fun getModelAssembler(): RepresentationModelAssembler<Category, EntityModel<Category>> {
        return entityModelAssembler;
    }

    override fun getCurrentClass(): Class<Category> {
        return Category::class.java
    }

    override fun getSortFieldType(sortField: String): SortField.Type {
        val sortFieldType = SortField.Type.STRING
        return sortFieldType
    }

    override fun getSearchFields(): List<String> {
        return listOf("name_Search")
    }
}