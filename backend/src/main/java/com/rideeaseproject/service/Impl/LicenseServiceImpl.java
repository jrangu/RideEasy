package com.rideeaseproject.service.Impl;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.model.*;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.License;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.LicenseRepo;
import com.rideeaseproject.service.LicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LicenseServiceImpl implements LicenseService {

    @Value("${bucketName}")
    private String bucketName;

    @Value("${endpointUrl}")
    private String endpointUrl;

    @Autowired
    private AmazonS3 amazonS3;

    private static final String LABEL_DL = "Driving License";
    private static final float CONFIDENCE_LEVEL = 85F;
    private static final int MAX_LEVELS = 5;

    @Autowired
    private AmazonRekognition amazonRekognition;

    @Autowired
    private LicenseRepo licenseRepo;

    @Autowired
    private DriversRepo driversRepo;


    @Override
    public String uploadLicenseIfValid(String email, MultipartFile multipartFile, String firstName, String lastName, String license, Date expiryDate) {
        String result = uploadFile(email, multipartFile);
        License license1 = new License();
        if (result != "invalid") {
            license1.setFullName(firstName + lastName);
            license1.setExpiryDate(expiryDate);
            license1.setLicense(true);
            license1.setLicenseNumber(license);
            licenseRepo.save(license1);
            Drivers driver = driversRepo.getDriverByEmail(email);
            driversRepo.saveLicenseId(license1, driver.getId());
            return result;
        } else
            return result;
    }

    public String uploadFile(String email, MultipartFile multipartFile) {
        String fileName = "";

        String status = null;
        try {
            System.out.println("inside uploadFile ");
            File file = convertMultiPartToFile(multipartFile);
            fileName = multipartFile.getOriginalFilename();
            System.out.println("filename" + fileName);
            String fileUrl = endpointUrl + "/" + email + "/" + fileName;
            status = uploadFileTos3bucket(email + "/" + fileName, file);
            file.delete();

        } catch (Exception e) {

            System.out.println("Image Upload Failed:" + e.getMessage());
            return ("Image Upload Failed" + HttpStatus.INTERNAL_SERVER_ERROR);

        }
        boolean result = isImageDL(email + "/" + fileName);
        System.out.println("result from rekog : " + result);
        if (result) {

            return "valid";
        } else
            return "invalid";
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertFile);
        fos.write(file.getBytes());
        fos.close();
        return convertFile;
    }


    private String uploadFileTos3bucket(String fileName, File file) {
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            return "uploadFileTos3bucket().Uploading failed :" + e.getMessage();
        }
        return "Uploading Successful ";
    }


    @Override
    public boolean isImageDL(String image) {

        boolean isDL = false;

        DetectLabelsRequest request = new DetectLabelsRequest()
                .withImage(new Image().withS3Object(new S3Object().withName(image).withBucket(bucketName)))
                .withMaxLabels(MAX_LEVELS)
                .withMinConfidence(CONFIDENCE_LEVEL);

        try {
            DetectLabelsResult result = amazonRekognition.detectLabels(request);
            List<Label> labels = result.getLabels();

            System.out.println("Detected labels for " + image);
            for (Label label : labels) {

                if (label.getName().equalsIgnoreCase(LABEL_DL)) {
                    System.out.println("label is : " + label);
                    isDL = true;
                }
            }

        } catch (AmazonRekognitionException e) {
            e.printStackTrace();
        }
        return isDL;
    }

    @Override
    public boolean licenseCheck(String email) {
        return driversRepo.checkLicense(email) != null;
    }

    @Override
    public  License getLicenseByEmail(String email){
        long licenseId = driversRepo.checkLicense(email);
        Optional<License> license= licenseRepo.findById(licenseId);
        if(license.isPresent()){
            return license.get();
        }
        return null;
    }
}