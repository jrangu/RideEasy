package com.rideeaseproject.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "driver_id")
    private Drivers driverId;

    private String start_location;
    private String end_location;
    private int seatsOffered;
    private Double price;
    
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date startDateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Drivers getDriverId() {
        return driverId;
    }

    public void setDriverId(Drivers driverId) {
        this.driverId = driverId;
    }

    public String getStartLocation() {
        return start_location;
    }

    public void setStartLocation(String start_location) {
        this.start_location = start_location;
    }

    public String getEndLocation() {
        return end_location;
    }

    public void setEndLocation(String end_location) {
        this.end_location = end_location;
    }

    public int getSeatsOffered() {
        return seatsOffered;
    }

    public void setSeatsOffered(int seatsOffered) {
        this.seatsOffered = seatsOffered;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }


}
