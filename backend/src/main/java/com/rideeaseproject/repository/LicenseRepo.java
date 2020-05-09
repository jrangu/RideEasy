package com.rideeaseproject.repository;

import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LicenseRepo extends JpaRepository<License,Long> {


}