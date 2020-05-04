package com.rideeaseproject.controller;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.service.DriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
public class DriversController {
    @Autowired
    private DriversService driversService;

    @GetMapping(path="/driversList")
    public List<Drivers> getDriversList(){
        return driversService.getDriverPosts();
    }
    

	@GetMapping(path="/driverConfirmation")
	public Drivers getDriverConfirmation(@RequestParam String email,  @RequestParam int trip_id ){
	
		System.out.println("driver controller with rider email and trip id" + email + trip_id);
		Drivers driver = driversService.getDriverConfirmation(email, trip_id);
		System.out.println("driver controller with driver detail" + driver);
		return driver;
	}
    
}
