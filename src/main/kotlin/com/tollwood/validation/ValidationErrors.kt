package com.tollwood.validation

import org.springframework.validation.Errors
import java.util.*

class ValidationErrors() {

    companion object {
        fun notNull(input: Double?, field: String, errors: Errors) {
            if (input == null) {
                errors.rejectValue(field, "requiredField", "requiredField")
            }
        }

        fun notEmpty(input: String?, field: String, errors: Errors) {
            if (input == null || input.trim { it <= ' ' }.length == 0) {
                errors.rejectValue(field, "notEmpty", "notEmpty")
            }
        }

        fun alreadyExists(optional: Optional<*>, field: String, errors: Errors) {
            optional.ifPresent({ errors.rejectValue(field, "alreadyExists", "alreadyExists") })
        }
    }
}