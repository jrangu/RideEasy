package com.rideeaseproject.controller;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
public class BookingsController {

    @Autowired
    private BookingService bookingsService;

    @GetMapping(path = "/bookingsList")
    public List<Bookings> getBookingsForRider(@RequestParam String email) {
        List<Bookings> bookings = bookingsService.getBookingsForRider(email);
        System.out.println("controller" + bookings.toString());
        return bookings;
    }

    @GetMapping(path = "/getBookingById/{id}")
    public Bookings getBookingsForRider(@PathVariable int id) {
        return bookingsService.getBookingById(id);
    }

    @PostMapping(path="/addBooking")
	public int addBookingForTrip(@RequestParam int driverId, @RequestParam int tripId, @RequestParam String riderEmail){
    	return bookingsService.addBookingForTrip(driverId,tripId,riderEmail);
	}
}
