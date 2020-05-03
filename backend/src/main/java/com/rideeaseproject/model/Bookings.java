package com.rideeaseproject.model;

import javax.persistence.*;


@Entity
@Table

public class Bookings {
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

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
