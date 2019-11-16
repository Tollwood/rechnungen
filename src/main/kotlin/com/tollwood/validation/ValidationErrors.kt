package com.tollwood.validation

import com.tollwood.jpa.BaseEntity
import org.springframework.validation.Errors
import java.util.*
import kotlin.reflect.full.isSubclassOf

class ValidationErrors() {

    companion object {
        fun notNull(input: Double?, field: String, errors: Errors) {
            if (input == null) {
                errors.rejectValue(field, "requiredField", "Pflichtfeld")
            }
        }

        fun notEmpty(input: String?, field: String, errors: Errors) {
            if (input == null || input.trim { it <= ' ' }.length == 0) {
                errors.rejectValue(field, "notEmpty", "Pflichtfeld")
            }
        }

        fun alreadyExists(optional: Optional<*>, id: Long?, field: String, errors: Errors) {
            if (optional.isPresent && optional.get()::class.isSubclassOf(BaseEntity::class) && id != (optional.get() as BaseEntity).id) {
                errors.rejectValue(field, "alreadyExists", "Existiert bereits")
            }
        }
    }
}