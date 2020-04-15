package com.rideeaseproject.controller;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.service.DriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin("*")
@RestController
public class DriversController {
    @Autowired
    private DriversService driversService;

    @GetMapping(path="/driversList")
    public List<Drivers> getDriversList(){
        return driversService.getDriverPosts();
    }
}
