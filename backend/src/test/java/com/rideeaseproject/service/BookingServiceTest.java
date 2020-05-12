package com.rideeaseproject.service;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.RidersRepo;
import com.rideeaseproject.repository.TripRepo;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest
class BookingServiceTest {

  @MockBean private BookingsRepo bookingDetailsRepo;

  @MockBean private RidersRepo ridersRepo;

  @MockBean private DriversRepo driversRepo;

  @MockBean private TripRepo tripRepo;

  @Autowired private BookingService bookingService;

  @Test
  public void getBookingsForRider() {
    List<Bookings> list = new ArrayList<>();
    Bookings bookingDetails = new Bookings();
    list.add(bookingDetails);
    Riders riders = new Riders();
    riders.setEmail("abc@gmail.com");
    given(ridersRepo.getRiderByEmail("test@gmail.com")).willReturn(riders);
    given(bookingDetailsRepo.getBookingsForRider("test@gmail.com"))
        .willReturn((ArrayList<Bookings>) list);
    assertEquals(bookingService.getBookingsForRider("test@gmail.com"), list);
  }

  @Test
  public void getBookingById() {
    Bookings booking = new Bookings();
    given(bookingDetailsRepo.findById(1)).willReturn(Optional.of(booking));
    assertEquals(bookingService.getBookingById(1), booking);
  }

  @Test
  public void addBookingForTrip() {
    Riders rider = new Riders();
    given(ridersRepo.getRiderByEmail("test@sjsu.edu")).willReturn(rider);
    Trip trip = new Trip();
    given(tripRepo.findById(1)).willReturn(Optional.of(trip));
    Drivers driver = new Drivers();
    given(driversRepo.findById(1)).willReturn(Optional.of(driver));
    Bookings bookings = new Bookings();
    bookings.setId(1);
    given(bookingDetailsRepo.save(any())).willReturn(bookings);
    assertEquals(bookingService.addBookingForTrip(1, 1, "test@sjsu.edu"), 1);
  }
}
