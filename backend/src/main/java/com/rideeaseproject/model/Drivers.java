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

    private String startLocation;
    private String endLocation;
    private int capacity;
    private int price;
    private Date journeyDate;


    public Drivers() {

    }

    public Drivers(String startLocation, String endLocation, int capacity, int price, Date journeyDate) {
        super();
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.capacity = capacity;
        this.price = price;
        this.journeyDate = journeyDate;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getstartLocation() {
        return startLocation;
    }

    public void setstartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getendLocation() {
        return endLocation;
    }

    public void setendLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public int getcapacity() {
        return capacity;
    }

    public void setcapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getprice() {
        return price;
    }

    public void setprice(int price) {
        this.price = price;
    }

    public Date getjourneyDate() {
        return journeyDate;
    }

    public void setjourneyDate(Date journeyDate) {
        this.journeyDate = journeyDate;
    }


}




