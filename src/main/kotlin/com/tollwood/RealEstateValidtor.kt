package com.tollwood

import com.tollwood.jpa.RealEstate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator
import java.util.function.Consumer


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

        if (checkInputString(realEstate.name)) {
            errors.rejectValue("name", "requiredField", "requiredField")
        } else {
            realestateResource.findByName(realEstate.name!!)
                    .ifPresent(Consumer { errors.rejectValue("name", "alreadyExists", "alreadyExists") })
        }
    }

    private fun checkInputString(input: String?): Boolean {
        return input == null || input.trim { it <= ' ' }.length == 0
    }
}