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
	    
	    public Trip getTripId()
	    {
	    	return trip;
	    }
	    
	    public Trip setTripId(Trip trip) {
	    	return this.trip = trip;
	    }
	    
	    public Drivers getDriverId()
	    {
	    	return driver;
	    }
	    
	    public Drivers setDriverId(Drivers driver) {
	    	return this.driver = driver;
	    }
	    
	    public Riders getRiderId()
	    {
	    	return rider;
	    }
	    
	    public Riders setRiderId(Riders rider) {
	    	return this.rider = rider;
	    }
}
