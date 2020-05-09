package com.rideeaseproject.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.RidersRepo;
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
	@GetMapping("/getUserByEmail/{email}/{role}")
	public String getUserByEmail(@PathVariable String email,@PathVariable String role) {
		
		if(role.equalsIgnoreCase("Driver")) {
			if(userProfileService.getUser(email, role)!=null) 
				return "Driver";		
		}else if(role.equalsIgnoreCase("Rider")){
			if(userProfileService.getUser(email, role)!=null) 
				return "Rider";	
		}
		
		return "None";
	}

}
