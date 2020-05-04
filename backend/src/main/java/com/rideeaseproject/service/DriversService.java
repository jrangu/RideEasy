package com.rideeaseproject.service;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.DriversRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class DriversService {

    @Autowired
    private DriversRepo driversRepo;
    
    @Autowired
    private BookingsRepo bookingsRepo;

    public List<Drivers> getDriverPosts(){
        return driversRepo.findAll();
    }
    
	public Drivers getDriverConfirmation(@RequestParam String email,  @RequestParam int trip_id ){
		
		System.out.println("in service" );
		
		Bookings bookingDetail = bookingsRepo.getDriverConfirmation(email, trip_id);
		Drivers driver = bookingDetail.getDriverId();
		
		System.out.println("in service details driver " + driver );
		return driver;
		
	}

}
