package com.tollwood

import org.hibernate.search.jpa.FullTextEntityManager
import org.hibernate.search.jpa.Search
import javax.persistence.EntityManager

class SearchSessionFactory{

    companion object{

        fun getFulltextSession(entityManager: EntityManager): FullTextEntityManager {
            return Search.getFullTextEntityManager(entityManager)
        }
    }

}