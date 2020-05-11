package com.rideeaseproject.service;

import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.MessageAttributeValue;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import com.rideeaseproject.model.Bookings;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Riders;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.BookingsRepo;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.RidersRepo;
import com.rideeaseproject.repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingsRepo bookingsRepo;

    @Autowired
    private RidersRepo ridersRepo;

    @Autowired
    private TripRepo tripRepo;

    @Autowired
    private DriversRepo driversRepo;

    @Autowired
    private AmazonSNS amazonSNS;

    public List<Bookings> getBookingsForRider(@RequestParam String email) {
        List<Bookings> booking = bookingsRepo.getBookingsForRider(email);
        return booking;
    }

    public Bookings getBookingById(int id) {
        Optional<Bookings> booking = bookingsRepo.findById(id);
        if (booking.isPresent()) {
            return booking.get();
        }
        return null;
    }

    public int addBookingForTrip(int driverId, int tripId, String email) {
        try {
            Riders rider = ridersRepo.getRiderByEmail(email);
            Optional<Trip> trip = tripRepo.findById(tripId);
            Optional<Drivers> driver = driversRepo.findById(driverId);
            if (rider != null && trip.isPresent() && driver.isPresent()) {
                Bookings newBooking = new Bookings();
                newBooking.setTripId(trip.get());
                newBooking.setRiderId(rider);
                newBooking.setDriverId(driver.get());
                newBooking = bookingsRepo.save(newBooking);
                if (rider.isRegisteredUser()) {
                    sendSMSMessage(newBooking);
                }
                tripRepo.updateSeatsOffered(tripId);
                return newBooking.getId();
            } else {
                return -1;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    private void sendSMSMessage(Bookings newBooking) {
        try {
            String message = "Booking confirmation number is " + newBooking.getId() + ". Driver's contact: " + newBooking.getDriverId().getPhoneNumber();
            String phoneNumber = newBooking.getRiderId().getPhoneNumber();
            Map<String, MessageAttributeValue> smsAttributes = new HashMap<String, MessageAttributeValue>();
            smsAttributes.put("AWS.SNS.SMS.SenderID", new MessageAttributeValue()
                    .withStringValue("RideEase") //The sender ID shown on the device.
                    .withDataType("String"));
            PublishResult result = amazonSNS.publish(new PublishRequest()
                    .withMessage(message)
                    .withPhoneNumber(phoneNumber)
                    .withMessageAttributes(smsAttributes));
            System.out.println("Message ID" + result);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
