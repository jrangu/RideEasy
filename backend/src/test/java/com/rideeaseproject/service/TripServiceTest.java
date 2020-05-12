package com.rideeaseproject.service;

import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.TripRepo;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest
class TripServiceTest {

    @MockBean
    private DriversRepo driversRepo;

    @MockBean
    private TripRepo tripRepo;

    @Autowired
    private TripService tripService;

    @Test
    void getDriverTrips() {
        Drivers driver = new Drivers();
        driver.setId(1);
        given(driversRepo.getDriverByEmail("email")).willReturn(driver);
        List<Trip> trips = Arrays.asList(new Trip());
        given(tripRepo.getDriverTrips(1)).willReturn(trips);
        assertEquals(tripService.getDriverTrips("email"), trips);
    }

    @Test
    void searchTrips() {
        List<Trip> list = new ArrayList<>();
        given(tripRepo.searchTrips("Sunnyvale","google")).willReturn(list);
        assertEquals(tripRepo.searchTrips("Sunnyvale","google"),list);
    }
}