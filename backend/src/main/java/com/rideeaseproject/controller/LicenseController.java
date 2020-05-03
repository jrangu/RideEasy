package com.rideeaseproject.controller;

import com.rideeaseproject.service.LicenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class LicenseController {

        @Autowired
        private LicenseService service;

        @GetMapping(path = "/checkLabel")
        public ResponseEntity<?> userDetails(@RequestParam String image)
        {
            boolean isDrivingLicense = service.isImageDL(image);
            if (isDrivingLicense)
                return ResponseEntity.ok(true);
            else
                return new ResponseEntity<>("Image Label Check Failed", HttpStatus.BAD_REQUEST);
        }
}
