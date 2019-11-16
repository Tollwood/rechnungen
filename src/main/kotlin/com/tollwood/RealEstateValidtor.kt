package com.tollwood

import com.tollwood.jpa.RealEstate
import com.tollwood.validation.ValidationErrors.Companion.alreadyExists
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator


@Component("beforeSaveRealEstateValidtor")
class BeforeSaveRealEstateValidtor(@Autowired realestateResource: RealestateResource) : RealEstateValidtor(realestateResource)


@Component("beforeCreateRealEstateValidtor")
class BeforeCreateRealEstateValidtor(@Autowired realestateResource: RealestateResource) : RealEstateValidtor(realestateResource)

open class RealEstateValidtor(@Autowired val realestateResource: RealestateResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return RealEstate::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val realEstate = obj as RealEstate

        notEmpty(realEstate.name, "name", errors)
        alreadyExists(realestateResource.findByName(realEstate.name), realEstate.id, "name", errors)
    }
}