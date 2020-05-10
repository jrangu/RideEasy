package com.rideeaseproject.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.rideeaseproject.model.Drivers;
import com.rideeaseproject.model.Trip;
import com.rideeaseproject.repository.DriversRepo;
import com.rideeaseproject.repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepo tripRepo;

    @Autowired
    private DriversRepo driversRepo;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${bucketName}")
    private String bucketName;

    @Value("${endpointUrl}")
    private String endpointUrl;

    public List<Trip> getDriverTrips(String email) {
        Drivers driver = driversRepo.getDriverByEmail(email);
        if (driver == null) {
            return null;
        }
        int driverId = driver.getId();
        return tripRepo.getDriverTrips(driverId);
    }

    public List<Trip> searchTrips(String srcLocation, String destLocation) {
        return tripRepo.searchTrips(srcLocation, destLocation);
    }

    public boolean addTrip(Trip tripDetails, MultipartFile file, String email) {
        try {
            Drivers driver = driversRepo.getDriverByEmail(email);
            if (driver == null) {
                return false;
            }
            tripDetails.setDriverId(driver);
            String imageUrl = uploadFile(file);
            System.out.println("imageurl" + imageUrl);
            tripDetails.setImageURl(imageUrl);
            tripRepo.save(tripDetails);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public String uploadFile(MultipartFile multipartFile) {
        String fileUrl = "";
        String status = null;
        try {
            System.out.println("inside uploadFile ");
            File file = convertMultiPartToFile(multipartFile);
            String fileName = multipartFile.getOriginalFilename();
            System.out.println("filename" + fileName);
            fileUrl = endpointUrl + "/" + fileName;
            status = uploadFileTos3bucket(fileName, file);
            file.delete();
        } catch (Exception e) {
            System.out.println("Image Upload Failed:" + e.getMessage());
            return ("Image Upload Failed" + HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return fileUrl;
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

}
