package com.tollwood.company

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths


@CrossOrigin("*")
@RestController
class CompanyImageUploadController {

    @Value(value= "\${upload.folder}")
    lateinit var uploadfolder: String

    @Autowired
    lateinit var companyResource: CompanyResource


    @PostMapping(value = ["/api/company/{id}/image"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadFile(@RequestParam file: MultipartFile, @PathVariable("id") id: String, @RequestParam type: String): ResponseEntity<*> {
        var company = companyResource.getCurrent()
        val companyName: String = company.shortName;
        try { // Get the file and save it somewhere
            val bytes = file.bytes
            val path: Path = Paths.get(uploadfolder +"/"+ companyName + "/"+ type +getFileExtension(file.originalFilename))
            if("logo".equals(type)){
                Files.write(path, bytes)
                company.logo = companyName + "/" + type + getFileExtension(file.originalFilename)
                companyResource.save(company)
            }
            else if("thankYouImage".equals(type)){
                Files.write(path, bytes)
                company.thankYouImage = companyName + "/" + type + getFileExtension(file.originalFilename)
                companyResource.save(company)
            }
            logger.info(String.format("File name '%s' uploaded successfully.", file.originalFilename))
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return ResponseEntity.ok().build<Any>()
    }

    private fun getFileExtension(fileName: String?): String? {
        return if (fileName?.lastIndexOf(".") != -1 && fileName?.lastIndexOf(".") != 0) fileName?.substring(fileName.lastIndexOf("."))
        else ""
    }
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(CompanyImageUploadController::class.java)
    }
}