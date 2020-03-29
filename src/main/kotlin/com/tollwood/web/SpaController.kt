package com.tollwood.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class SpaController {
        @RequestMapping("/{path:[^\\.]*}")
        fun redirect(): String {
            println("handle forward")
            return "forward:/"
        }
}