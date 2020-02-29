package com.structure.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
public class Routing {

    @GetMapping(value = "/hello")
    public String hello(@RequestParam String name){
        return "Oh, hey " + name + "!";
    }
}
