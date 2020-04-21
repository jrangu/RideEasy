package com.rideeaseproject.service;

import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepo tripRepo;

    public List<Trip> getTrips(){
        return tripRepo.getTrips();
    }
}
