package com.rideeaseproject.repository;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;


@Repository
public interface DriversRepo extends JpaRepository<Drivers, Integer> {

    @Query("SELECT d FROM Drivers d WHERE LOWER(d.email) = LOWER(:email)")
    public Drivers getDriverByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "update drivers set license_id= ?1 where email=?2",
            nativeQuery = true)
    void saveLicenseId(License license, String email);

}
