package com.rideeaseproject.service.Impl;

import com.rideeaseproject.model.License;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.LicenseRepo;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest
class LicenseServiceImplTest {
  @MockBean private LicenseRepo licenseRepo;

  @MockBean private DriversRepo driversRepo;

  @Autowired private LicenseServiceImpl licenseService;

  @Test
  void licenseCheck() {
    given(driversRepo.checkLicense("test@sjsu.edu")).willReturn(1l);
    assertTrue(licenseService.licenseCheck("test@sjsu.edu"));
  }

  @Test
  void licenseCheckFalse() {
    given(driversRepo.checkLicense("test@sjsu.edu")).willReturn(null);
    assertFalse(licenseService.licenseCheck("test@sjsu.edu"));
  }

  @Test
  void getLicenseByEmail() {
    given(driversRepo.checkLicense("test@sjsu.edu")).willReturn(1l);
    License license = new License();
    given(licenseRepo.findById(1l)).willReturn(Optional.of(license));
    assertEquals(licenseService.getLicenseByEmail("test@sjsu.edu"), license);
  }
}
