package com.rideeaseproject.service;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.DriversRepo;
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
class DriversServiceTest {

  @MockBean private DriversRepo driversRepo;
  @MockBean private BookingsRepo bookingsRepo;
  @Autowired private DriversService driverService;

  @Test
  void getDriverPosts() {
    List<Drivers> list = new ArrayList<>();
    given(driversRepo.findAll()).willReturn(list);
    assertEquals(driverService.getDriverPosts(), list);
  }

  @Test
  public void getDriverConfirmation() {
    Bookings booking = new Bookings();
    Drivers driver = new Drivers();
    booking.setDriverId(driver);
    given(bookingsRepo.getDriverConfirmation("test@sjsu.edu", 1)).willReturn(booking);
    assertEquals(driverService.getDriverConfirmation("test@sjsu.edu", 1), driver);
  }
}
