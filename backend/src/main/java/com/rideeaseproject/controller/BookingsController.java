package com.rideeaseproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rideeaseproject.model.Bookings;

import com.rideeaseproject.service.BookingService;



@CrossOrigin("*")
@RestController
public class BookingsController {

	
	@Autowired
	private BookingService bookingsService;



			


	@GetMapping(path="/bookingsList")
	public List<Bookings> getBookingsForRider(@RequestParam String email){
	
		List<Bookings> bookings = bookingsService.getBookingsForRider(email);
		System.out.println("controller" + bookings.toString());
		return bookings;
	}
	   
}
