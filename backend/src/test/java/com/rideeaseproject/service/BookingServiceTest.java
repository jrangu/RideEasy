package com.rideeaseproject.service;



import java.util.List;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.RidersRepo;

@RunWith(SpringRunner.class)
@SpringBootTest

class BookingServiceTest {

	@MockBean
	private BookingsRepo bookingDetailsRepo;
	
	@MockBean
	private RidersRepo ridersRepo;
	
	@Autowired
	private BookingService bookingService;
	
	
	@Test
	public void getBookingsForRider() {
		
		List<Bookings> list = new ArrayList<>();
		Bookings bookingDetails = new Bookings();
		list.add(bookingDetails);
		Riders riders = new Riders();
		riders.setEmail("abc@gmail.com");
		System.out.println("email" + riders );
		given(ridersRepo.getRiderByEmail("test@gmail.com")).willReturn(riders);
		System.out.println("list" + list );
		given(bookingDetailsRepo.getBookingsForRider("test@gmail.com")).willReturn((ArrayList<Bookings>) list);
		
		assertEquals(bookingService.getBookingsForRider("test@gmail.com"), list);
		   

	}

}




