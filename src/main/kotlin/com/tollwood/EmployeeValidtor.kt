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
        val employee = obj as Employee
        notEmpty(employee.technicianId, "technicianId", errors);
        ValidationErrors.alreadyExists(employeeResource.findByTechnicianId(employee.technicianId), employee.id,"technicianId", employee
                .technicianId, errors)
        notEmpty(employee.firstName, "firstName", errors);
        notEmpty(employee.lastName, "lastName", errors);
        notEmpty(employee.email, "email", errors);
        notEmpty(employee.phone, "phone", errors);
        notEmpty(employee.taxIdent, "taxIdent", errors);


        notEmpty(employee.bankDetails.bankName, "bankDetails.bankName", errors);
        notEmpty(employee.bankDetails.iban, "bankDetails.iban", errors);
        notEmpty(employee.bankDetails.bic, "bankDetails.bic", errors);


        notEmpty(employee.address.street, "address.street", errors);
        notEmpty(employee.address.houseNumber, "address.houseNumber", errors);
        notEmpty(employee.address.zipCode, "address.zipCode", errors);
        notEmpty(employee.address.city, "address.city", errors);
    }
}