package com.rideeaseproject.model;



import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Riders {



	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String firstname;
	private String lastname;
	private String pickup;
	private String dropoff;
	private Date journeyDate;

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	


	public Riders() {
		
	}
	
	public Riders(String firstname, String lastname, String pickup,String dropoff, Date journeyDate ) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.pickup = pickup;
		this.dropoff = dropoff;
		this.journeyDate = journeyDate;
		
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getpickup() {
		return pickup;
	}

	public void setpickup(String pickup) {
		this.pickup = pickup;
	}
	
	public String getdropOff() {
		return dropoff;
	}

	public void setdropOff(String dropoff) {
		this.dropoff = dropoff;
	}
	public Date getjourneyDate() {
		return journeyDate;
	}

	public void setjourneyDate(Date journeyDate) {
		this.journeyDate = journeyDate;
	}
	

}



