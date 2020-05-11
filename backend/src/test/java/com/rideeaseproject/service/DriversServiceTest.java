package com.rideeaseproject.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.License;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.DriversRepo;



class DriversServiceTest {
	
	@MockBean
	    private DriversRepo driversRepo;

	@Autowired
	private DriversService driverService;
	
	@Test
	void getDriverPosts() {
		

		
	}

}
