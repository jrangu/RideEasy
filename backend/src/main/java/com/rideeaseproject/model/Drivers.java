package com.rideeaseproject.model;

import javax.persistence.*;

@Entity
@Table

public class Drivers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userName;
    private String email;
    private String phoneNumber;

    public Drivers() {

    }
    
	public Drivers(String userName, String email, String phoneNumber, License license) {
		super();
		this.userName = userName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.license = license;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}


	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "license_id")
    private License license;

    public License getLicense() {
        return license;
    }

    public void setLicense(License license) {
        this.license = license;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

    
}




