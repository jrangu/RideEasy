package com.rideeaseproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.model.Trip;


@Repository
public interface BookingsRepo extends JpaRepository<Bookings, Integer> {
	

    @Query("select b from Bookings b where b.rider.email =?1")
    public List<Bookings> getBookingsForRider(String email);
    
    @Query("select b from Bookings b where b.driver.email =?1")
    
    public List<Bookings> getRidersForDriver(String email);
  

    @Query("select b from Bookings b where b.driver.email =?1 and b.trip.id = ?2")
    
    public List<Bookings> getRidersForTrip(String email, int trip_id);
    
    @Query("select b from Bookings b where b.rider.email =?1 and b.trip.id =?2")
  public Bookings getDriverConfirmation(String email, int trip_id);

    
    
}
