package com.tollwood.rechnungen

import javax.persistence.*
import javax.persistence.GenerationType.AUTO

@Entity(name = "ARTICLE")
data class Article(
        @Id
        @GeneratedValue(strategy = AUTO)
        val id: Long,
        val articleNumber: String,
        val title: String ,
        val price: Double,
        @ManyToOne
        val group: ArticleGroup)