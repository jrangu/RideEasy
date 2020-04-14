package com.rideeaseproject.repository;

import com.rideeaseproject.model.Drivers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DriversRepo extends JpaRepository<Drivers, Integer> {
}
