package com.tollwood

import com.tollwood.jpa.Service
import com.tollwood.validation.ValidationErrors
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import com.tollwood.validation.ValidationErrors.Companion.notNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator


@Component("beforeSaveServiceValidtor")
class BeforeSaveServiceValidtor(@Autowired serviceResource: ServiceResource) : ServiceValidtor(serviceResource)


@Component("beforeCreateServiceValidtor")
class BeforeCreateServiceValidtor(@Autowired serviceResource: ServiceResource) : ServiceValidtor(serviceResource)

open class ServiceValidtor(@Autowired val serviceResource: ServiceResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return Service::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val service = obj as Service
        notEmpty(service.articleNumber, "articleNumber", errors);
        ValidationErrors.alreadyExists(serviceResource.findByArticleNumber(service.articleNumber), service.id,"articleNumber",
                service.articleNumber, errors)
        notEmpty(service.title, "title", errors);
        notNull(service.price, "price", errors)
    }
}