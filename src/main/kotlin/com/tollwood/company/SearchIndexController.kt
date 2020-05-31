package com.tollwood.company

import com.tollwood.SearchSessionFactory
import org.hibernate.search.jpa.FullTextEntityManager
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext


@CrossOrigin("*")
@RestController
class SearchIndexController {

    @PersistenceContext
    lateinit var entityManager: EntityManager


    @GetMapping(value = ["/api/company/index"])
    fun uploadFile(): ResponseEntity<*> {

        val FullTextEntityManager: FullTextEntityManager = SearchSessionFactory.getFulltextSession(entityManager)
        FullTextEntityManager.createIndexer().start()

        return ResponseEntity.noContent().build<Any>()
    }

}