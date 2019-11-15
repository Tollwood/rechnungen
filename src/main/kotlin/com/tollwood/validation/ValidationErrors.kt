package com.tollwood.validation

import org.springframework.validation.Errors
import java.util.*

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

        fun alreadyExists(optional: Optional<*>, field: String, errors: Errors) {
            optional.ifPresent({ errors.rejectValue(field, "alreadyExists", "Existiert bereits") })
        }
    }
}