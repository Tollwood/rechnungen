package com.tollwood

import com.tollwood.jpa.Employee
import com.tollwood.validation.ValidationErrors
import com.tollwood.validation.ValidationErrors.Companion.notEmpty
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator


@Component("beforeSaveEmployeeValidtor")
class BeforeSaveEmployeeValidtor(@Autowired employeeResource: EmployeeResource) : EmployeeValidtor(employeeResource)


@Component("beforeCreateEmployeeValidtor")
class BeforeCreateEmployeeValidtor(@Autowired employeeResource: EmployeeResource) : EmployeeValidtor(employeeResource)

open class EmployeeValidtor(@Autowired val employeeResource: EmployeeResource) : Validator {

    override fun supports(clazz: Class<*>): Boolean {
        return Employee::class.java == clazz
    }

    override fun validate(obj: Any, errors: Errors) {
        val service = obj as Employee
        notEmpty(service.technicianId, "technicianId", errors);
        ValidationErrors.alreadyExists(employeeResource.findByTechnicianId(service.technicianId), "technicianId", errors)
        notEmpty(service.firstName, "firstName", errors);
        notEmpty(service.lastName, "lastName", errors);
        notEmpty(service.email, "email", errors);
        notEmpty(service.phone, "phone", errors);
        notEmpty(service.taxIdent, "taxIdent", errors);


        notEmpty(service.bankDetails.bankName, "bankDetails.bankName", errors);
        notEmpty(service.bankDetails.iban, "bankDetails.iban", errors);
        notEmpty(service.bankDetails.bic, "bankDetails.bic", errors);


        notEmpty(service.address.street, "address.street", errors);
        notEmpty(service.address.houseNumber, "address.houseNumber", errors);
        notEmpty(service.address.zipCode, "address.zipCode", errors);
        notEmpty(service.address.city, "address.city", errors);
    }
}