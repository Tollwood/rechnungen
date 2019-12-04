package com.tollwood.search

import org.hibernate.search.jpa.Search
import org.springframework.context.ApplicationListener
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.stereotype.Component
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.transaction.Transactional

@Component
class OrderHibernateSearchInit : ApplicationListener<ContextRefreshedEvent> {

    @PersistenceContext
    lateinit var entityManager: EntityManager

    @Transactional
    override fun onApplicationEvent(event: ContextRefreshedEvent) {

        val fullTextEntityManager = Search.getFullTextEntityManager(entityManager)
        fullTextEntityManager.createIndexer().startAndWait()
    }

}