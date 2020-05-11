package com.rideeaseproject.service;

import com.rideeaseproject.model.License;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public interface LicenseService {

    String uploadLicenseIfValid(String email, MultipartFile multipartFile, String firstName, String lastName,String license, Date expiryDate);

    boolean isImageDL(String s3Key);

    boolean licenseCheck(String email);

    License getLicenseByEmail(String email);
}
