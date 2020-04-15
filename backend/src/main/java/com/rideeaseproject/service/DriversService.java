package com.rideeaseproject.service;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.repository.DriversRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriversService {

    @Autowired
    private DriversRepo driversRepo;

    public List<Drivers> getDriverPosts(){
        return driversRepo.findAll();
    }

}
