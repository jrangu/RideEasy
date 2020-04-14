package com.rideeaseproject.repository;

import com.rideeaseproject.model.Riders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Driver;

@Repository
public interface RidersRepo extends JpaRepository<Riders, Integer> {
}
