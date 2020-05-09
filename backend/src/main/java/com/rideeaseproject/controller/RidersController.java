package com.rideeaseproject.controller;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.service.RidersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

public class RidersController {

    @Autowired
    private RidersService ridersService;

    private Bookings booking;


    @GetMapping(path = "/ridersList")
    public List<Riders> getRidersForDriver(@RequestParam String email) {
        System.out.println("input trip id in controller" + email);
        return ridersService.getRidersForDriver(email);
    }

    @GetMapping(path = "/ridersForTrip")
    public List<Riders> getRidersForTrip(@RequestParam String email, @RequestParam int trip_id) {
        System.out.println("input trip id in controller" + email);
        return ridersService.getRidersForTrip(email, trip_id);
    }

    @PutMapping(path="/registerForSMS")
    public String registerForSMS(@RequestParam boolean isRegister, @RequestParam String email){
        return ridersService.registerForSMS(isRegister,email);
    }


}
