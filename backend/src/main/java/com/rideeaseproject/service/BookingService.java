package com.rideeaseproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.RidersRepo;

@Service
public class BookingService {


@Autowired 
private BookingsRepo bookingsRepo;

private RidersRepo ridersRepo;

	
	public List<Bookings> getBookingsForRider(@RequestParam String email){
		


		List<Bookings> booking =  bookingsRepo.getBookingsForRider(email);

		return booking;
		
	}
		
}
