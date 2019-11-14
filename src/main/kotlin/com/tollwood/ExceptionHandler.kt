package com.tollwood

import org.springframework.data.rest.core.RepositoryConstraintViolationException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.util.*


@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(RepositoryConstraintViolationException::class)
    @ResponseBody
    fun handleAccessDeniedException(
            ex: RepositoryConstraintViolationException, request: WebRequest): ResponseEntity<Any> {

        val errors = HashMap<String, String?>()
        ex.errors.allErrors.forEach { error ->
            val fieldName = (error as FieldError).field
            val errorMessage = error.getDefaultMessage()
            errors[fieldName] = errorMessage
        }

        return ResponseEntity(errors, HttpHeaders(),
                HttpStatus.BAD_REQUEST)
    }
}