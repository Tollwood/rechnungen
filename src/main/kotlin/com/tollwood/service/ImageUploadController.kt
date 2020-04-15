package com.tollwood.service

import com.tollwood.company.CompanyResource
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
class ServiceImageUploadController {

    @Value(value= "\${upload.folder}")
    lateinit var uploadfolder: String

    @Autowired
    lateinit var companyResource: CompanyResource

    @Autowired
    lateinit var serviceResource: ServiceResource


    @PostMapping(value = ["/api/service/{id}/image"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadFile(@RequestParam file: MultipartFile, @PathVariable("id") id: String ): ResponseEntity<*> {
        val companyName: String = companyResource.getCurrent(2).shortName;
        val service: Service = serviceResource.findById(id.toLong()).get()
        try { // Get the file and save it somewhere
            val bytes = file.bytes
            val path: Path = Paths.get(uploadfolder +"/"+ companyName + "/services/"+ service.id +getFileExtension(file.originalFilename))
            Files.write(path, bytes)
            service.image = companyName + "/services/"+ service.id.toString() + getFileExtension(file.originalFilename)
            serviceResource.save(service)
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
        private val logger: Logger = LoggerFactory.getLogger(ServiceImageUploadController::class.java)
    }
}