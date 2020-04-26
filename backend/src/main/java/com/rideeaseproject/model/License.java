package com.rideeaseproject.model;


import javax.persistence.*;
import java.util.Date;

@Entity
    @Table(name = "License")
    public class License {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "id", updatable = false, nullable = false)
        private long id;
        private String fullName;
        private String licenseNumber;
        private Date expiryDate;
        private Boolean isLicense;

    @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "driver_id", referencedColumnName = "id")
        private Drivers driver;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Boolean getLicense() {
        return isLicense;
    }

    public void setLicense(Boolean license) {
        isLicense = license;
    }

    public Drivers getDriver() {
        return driver;
    }

    public void setDriver(Drivers driver) {
        this.driver = driver;
    }

    @Override
    public String toString() {
        return "License{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", licenseNumber='" + licenseNumber + '\'' +
                ", expiryDate=" + expiryDate +
                ", isLicense=" + isLicense +
                ", driver=" + driver +
                '}';
    }
}
