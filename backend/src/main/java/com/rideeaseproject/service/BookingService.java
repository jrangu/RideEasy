package com.rideeaseproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.rideeaseproject.model.Bookings;

import com.rideeaseproject.repository.BookingsRepo;

@Service
public class BookingService {


@Autowired 
private BookingsRepo bookingsRepo;

	
	public List<Bookings> getBookingsForRider(@RequestParam long rider_id){

		List<Bookings> booking =  bookingsRepo.getBookingsForRider(rider_id);

		return booking;
		
	}
		
}
