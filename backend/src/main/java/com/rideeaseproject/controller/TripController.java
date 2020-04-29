package com.rideeaseproject.controller;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "*")
public class TripController {
    @Autowired
    TripService tripService;
    
    @Autowired 
    private DriversRepo driversrepo;

    @GetMapping("/getTrips")
    public List<Trip> getTrips(){
        return tripService.getTrips();
    }

    @GetMapping("/searchTrips/{srcLocation}/{destLocation}")
    public  List<Trip> searchedTrips(@PathVariable String srcLocation,@PathVariable String destLocation){
        return  tripService.searchTrips(srcLocation,destLocation);
    }
    
    
    
    @RequestMapping(path = "/addTrip", method = RequestMethod.POST, consumes = "application/json")
    public String addTrip(@RequestBody Trip tripDetails) {
        try {
        	tripService.addTrip(tripDetails);
        	if(tripService.addTrip(tripDetails)== true){
        		  return "Trip added succesfully!";
        		
        	}
        	else {
        		return "Error while adding Trip";
        	}
      
    			
        }	
    		
        
        catch (Exception e) {
          e.printStackTrace();
        }

        return null;
      }
    
    
}
