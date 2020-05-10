package com.rideeaseproject.repository;

import com.rideeaseproject.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TripRepo extends JpaRepository<Trip, Integer> {
    @Query(value = "select * from trip where start_date_time >= curtime() and driver_id = ?1", nativeQuery = true)
    List<Trip> getDriverTrips(int driverId);

    @Query(value = "select * from trip where start_date_time >= curtime() and start_location like %?1% and end_location like %?2% and seats_offered > 0",
            nativeQuery = true)
    List<Trip> searchTrips(String srcLocation, String destLocation);

    @Transactional
    @Modifying
    @Query(value="update trip set seats_offered = seats_offered-1 where id = ?1",nativeQuery = true)
    void updateSeatsOffered(int tripId);
}
