package com.rideeaseproject.repository;

import com.rideeaseproject.model.Drivers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DriversRepo extends JpaRepository<Drivers, Integer> {

    @Query("SELECT d FROM Drivers d WHERE LOWER(d.email) = LOWER(:email)")
    public Drivers getDriverByEmail(@Param("email") String email);

}
