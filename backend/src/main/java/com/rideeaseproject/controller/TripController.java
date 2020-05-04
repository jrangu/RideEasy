package com.rideeaseproject.controller;

import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TripController {
    @Autowired
    TripService tripService;

    @Autowired
    private DriversRepo driversrepo;

    @GetMapping("/getDriverTrips/{email}")
    public List<Trip> getDriverTrips(@PathVariable String email) {
        return tripService.getDriverTrips(email);
    }

    @GetMapping("/searchTrips/{srcLocation}/{destLocation}")
    public List<Trip> searchedTrips(@PathVariable String srcLocation, @PathVariable String destLocation) {
        return tripService.searchTrips(srcLocation, destLocation);
    }

    @PostMapping(path = "/addTrip")
    public String addTrip(
            @RequestParam String startLocation,
            @RequestParam String endLocation,
            @RequestParam String seatsOffered,
            @RequestParam String price,
            @RequestParam String startDateTime,
            @RequestParam String carNumber,
            @RequestParam(value = "file") MultipartFile file,
            @RequestParam String email
    ) {
        try {
            Trip trip = new Trip();
            trip.setStartLocation(startLocation);
            trip.setEndLocation(endLocation);
            trip.setPrice(Double.parseDouble(price));
            trip.setCarNumber(carNumber);
            String pattern = "yyyy-MM-dd HH:mm:ss";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

            Date date = simpleDateFormat.parse(startDateTime);
            trip.setStartDateTime(date);
            trip.setSeatsOffered(Integer.parseInt(seatsOffered));
            if (tripService.addTrip(trip, file, email)) {
                return "Trip added succesfully!";
            } else {
                return "Error while adding Trip";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while adding Trip";
        }
    }
}
