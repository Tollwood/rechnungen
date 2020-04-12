package com.tollwood.company

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.tollwood.service.Service
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity(name = "CATEGORY")
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        val name: String,
        @ManyToOne
        @NotNull
        val company: Company,

        @ManyToMany(mappedBy = "categories")
        @JsonManagedReference
        val services: List<Service>
)