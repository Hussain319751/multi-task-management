package com.today.crud.controller;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.today.crud.Entity.HelloWorld;

@RestController
public class HomeController {

	@GetMapping("/basic-auth")
	public String basicAtuh() {
		return "success";
	} 
	
	@GetMapping("/")
	public String getHello() {
		return "hello world";
	}
	
	@GetMapping("/hello-world-bean")
	public HelloWorld getHelloBean() {
		return new HelloWorld("hello-world-bean");
	}
}
