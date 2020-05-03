package com.rideeaseproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Riders;


@Repository
public interface BookingsRepo extends JpaRepository<Riders, Integer> {
	

    @Query("select b from Bookings b where b.rider.id =?1")
    public List<Bookings> getBookingsForRider(long rider_id);
    
    
  

}
