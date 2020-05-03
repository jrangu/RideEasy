package com.rideeaseproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.RidersRepo;

@Service
public class UserProfileService {
	
	@Autowired
	private DriversRepo driversRepo;
	@Autowired
	private RidersRepo ridersRepo;
	
	public Object addUser(String userName,String email , String phoneNumber,  String Role) {
		
		if(Role.equalsIgnoreCase("Rider")) {
			Riders rider = new Riders();
			rider.setEmail(email);
			rider.setPhoneNumber(phoneNumber);
			rider.setUserName(userName);
			return ridersRepo.save(rider);
		}else {
			Drivers driver = new Drivers();
			driver.setEmail(email);
			driver.setPhoneNumber(phoneNumber);
			driver.setUserName(userName);
			return driversRepo.save(driver);	
		}
	}
	
	public Object getUser(@PathVariable String email,@RequestParam String role ) {
		
		if(role.equalsIgnoreCase("Rider")) {
			
			return ridersRepo.getRiderByEmail(email);
			
			
		}else {
			
			return driversRepo.getDriverByEmail(email);
		}
	}

}
