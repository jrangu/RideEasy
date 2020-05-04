package com.rideeaseproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.service.RidersService;

@RestController
@CrossOrigin(origins = "*")

public class RidersController {

@Autowired
private RidersService ridersService;


private Bookings booking;
		


@GetMapping(path="/ridersList")
public List<Riders> getRidersForTrip(@RequestParam String email){
   System.out.println("input trip id in controller" + email);
	return ridersService.getRidersForTrip(email);
}
		

}
