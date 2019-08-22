package com.tollwood.rechnungen

import org.jetbrains.annotations.NotNull
import javax.persistence.*
import javax.persistence.GenerationType.AUTO

@Entity(name="ARTICLE_GROUP")
class ArticleGroup(
        @Id
        @GeneratedValue(strategy = AUTO)
        val id: Long,
        @NotNull
        val title: String,
        @OneToMany(mappedBy = "group")
        val articles: List<Article>)
