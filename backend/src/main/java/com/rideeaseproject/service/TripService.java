package com.rideeaseproject.service;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepo tripRepo;

    @Autowired
    private DriversRepo driversRepo;

    public List<Trip> getDriverTrips(String email){
        Drivers driver = driversRepo.getDriverByEmail(email);
        if(driver == null){
            return null;
        }
        int driverId = driver.getId();
        return tripRepo.getDriverTrips(driverId);
    }

    public  List<Trip> searchTrips(String srcLocation,String destLocation){
        return  tripRepo.searchTrips(srcLocation,destLocation);
    }
    
    public boolean addTrip(Trip TripDetails) {
    	try {
    		tripRepo.save(TripDetails);
			return true;
		} catch (Exception e) {

		}
		return false;
    }
    
    
   
    
}
