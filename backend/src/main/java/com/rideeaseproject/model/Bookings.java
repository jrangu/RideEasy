package com.rideeaseproject.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.*;

public class Bookings {
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	   
	// TODO foreign key to get rider_id, driver_id, trip_id
//	   Trip id from Trip table
	   @OneToOne
	   @JoinColumn(name = "trip_id", referencedColumnName = "id")
	   private Trip trip;
	   
	   @OneToOne
	   @JoinColumn(name = "driver_id", referencedColumnName = "id")
	   private Drivers driver;
	   
	   @OneToOne
	   @JoinColumn(name = "rider_id", referencedColumnName = "id")
	   private Riders rider;
	   
	   
	   
	   public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }
}
