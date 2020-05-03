package com.rideeaseproject.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rideeaseproject.service.UserProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserProfileController {
	
	@Autowired
	private UserProfileService userProfileService ;
	
	@PostMapping("/addUser")
	public String addUser(@RequestParam String userName,@RequestParam String email ,@RequestParam  String phoneNumber, @RequestParam String role) {
		if(userProfileService.addUser(userName, email, phoneNumber, role) != null) {
			return "added driver/rider";
		}
		return "failed to add driver/rider";
	}
	
	@GetMapping("/getUser/{email}/{role}")
	public Boolean getUser(@PathVariable String email,@PathVariable String role ) {
		
		if(userProfileService.getUser(email, role) != null){
			return true;
		}
		
		return false;
	}

}
