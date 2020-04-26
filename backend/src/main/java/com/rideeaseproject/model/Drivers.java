package com.rideeaseproject.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table

public class Drivers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
// TODO foreign key to get id from DriverLicense Table

    private String firstName;
    private String lastName;
    private String licenseId;
    private String email;
    private long phoneNumber;


    public Drivers() {

    }

    public Drivers(String firstName, String lastName, String licenseId,String email, long phoneNumber) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.licenseId = licenseId;
        this.email = email;
        this.phoneNumber = phoneNumber;

    }

	@OneToOne(mappedBy = "drivers")
	private License license;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLicenseId() {
		return licenseId;
	}

	public void setLicenseId(String licenseId) {
		this.licenseId = licenseId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

    

}




