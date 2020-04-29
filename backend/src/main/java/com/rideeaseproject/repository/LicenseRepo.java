package com.rideeaseproject.repository;

import com.rideeaseproject.model.License;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LicenseRepo extends JpaRepository<License,Long> {
}
