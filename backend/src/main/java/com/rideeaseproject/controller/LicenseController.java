package com.rideeaseproject.controller;

import com.rideeaseproject.model.License;
import com.rideeaseproject.service.LicenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@CrossOrigin("*")
@RestController
public class LicenseController {

    @Autowired
    private LicenseService service;

    @PostMapping(path = "/uploadLC")
    public ResponseEntity<String> upload(
            @RequestParam(value = "file") MultipartFile file,
            @RequestParam String email,
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String license,
            @RequestParam Date expiryDate,
            HttpServletRequest request) {
        return ResponseEntity.ok(service.uploadLicenseIfValid(email, file, firstName,lastName,license,expiryDate));

    }

    @GetMapping(path = "/checkLabel")
    public ResponseEntity<?> userDetails(@RequestParam String image)
    {
        boolean isDrivingLicense = service.isImageDL(image);
        if (isDrivingLicense)
            return ResponseEntity.ok(true);
        else
            return new ResponseEntity<>("Image Label Check Failed", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/checkLicense/{email}")
    public ResponseEntity<?> checkLicense(@PathVariable String email)
    {
        System.out.println("controller checklicense" + email);
        return ResponseEntity.ok(service.licenseCheck(email));
    }

    @GetMapping(path = "/getLicense/{email}")
    public License getLicense(@PathVariable String email){
        return service.getLicenseByEmail(email);
    }
}
