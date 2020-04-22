package com.rideeaseproject.controller;

import com.rideeaseproject.model.Trip;
import com.rideeaseproject.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TripController {
    @Autowired
    TripService tripService;

    @GetMapping("/getTrips")
    public List<Trip> getTrips(){
        return tripService.getTrips();
    }

    @GetMapping("/searchTrips/{srcLocation}/{destLocation}")
    public  List<Trip> searchedTrips(@PathVariable String srcLocation,@PathVariable String destLocation){
        return  tripService.searchTrips(srcLocation,destLocation);
    }
}
