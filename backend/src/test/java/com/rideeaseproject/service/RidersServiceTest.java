package com.rideeaseproject.service;

// import static org.junit.Assert.assertEquals;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.RidersRepo;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest
class RidersServiceTest {
  @MockBean private BookingsRepo bookingDetailsRepo;

  @MockBean private RidersRepo ridersRepo;

  @MockBean private BookingService bookingService;
  @Autowired private RidersService riderService;

  @Test
  void getRidersForDriver() {
    List<Riders> ridersList = new ArrayList<Riders>();
    List<Bookings> bookingList = new ArrayList<Bookings>();
    Drivers driver = new Drivers();
    driver.setId(1);
    driver.setEmail("abc@gmail.com");
    System.out.println("email" + driver);

    Riders riders = new Riders();
    riders.setId(1);
    riders.setEmail("test@gmail.com");
    Bookings booking = new Bookings();
    booking.setRiderId(riders);
    booking.setDriverId(driver);
    bookingList.add(booking);
    System.out.println("bookingList" + bookingList);
    for (Bookings bookings : bookingList) {
      ridersList.add(riders);
    }
    given(bookingDetailsRepo.getRidersForDriver("abc@gmail.com")).willReturn(bookingList);
    assertEquals(riderService.getRidersForDriver("abc@gmail.com"), ridersList);
  }

  @Test
  public void getRidersForTrip() {
    List<Riders> ridersList = new ArrayList<Riders>();
    List<Bookings> bookingList = new ArrayList<Bookings>();
    given(bookingDetailsRepo.getRidersForTrip("test@sjsu.edu", 1)).willReturn(bookingList);
    assertEquals(riderService.getRidersForTrip("test@sjsu.edu", 1), ridersList);
  }

  @Test
  public void registerForSMS() {
    Riders rider = new Riders();
    given(ridersRepo.getRiderByEmail("test@sjsu.edu")).willReturn(rider);
    assertEquals(riderService.registerForSMS(true, "test@sjsu.edu"), "Updated SMS registration");
  }
}
