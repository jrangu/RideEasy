package com.rideeaseproject.repository;

import com.rideeaseproject.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepo extends JpaRepository<Trip, Integer> {
    @Query(value = "select * from trip where start_date_time >= curtime()", nativeQuery = true)
    List<Trip> getTrips();
}
