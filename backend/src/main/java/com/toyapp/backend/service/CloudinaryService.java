package com.toyapp.backend.service;

import com.cloudinary.Cloudinary;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {
    
    @Resource
    private Cloudinary cloudinary;
    
    public String uploadCategoryImage(MultipartFile file) {
        return uploadImage(file, "categories");
    }

    public void deleteCategoryImage(String imageUrl) {
        try {
            String publicId = getPublicId(imageUrl);
            cloudinary.uploader().destroy(publicId, new HashMap<>());
//             cloudinary.api().deleteResources(Arrays.asList(publicId), new HashMap<>());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    public List<String> uploadToyImages(List<MultipartFile> files) {
        return uploadMultipleImages(files, "toys");
    }


    public String uploadImage(MultipartFile file, String folderName) {
        try {
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder","EducationsToys/" +  folderName);
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadResult.get("public_id");
            return cloudinary.url().secure(true).generate(publicId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    public List<String> uploadMultipleImages(List<MultipartFile> files, String folderName){
        List<String> imageUrls = new ArrayList<>();
        
        for(MultipartFile file : files) {
            try {
                HashMap<Object, Object> options = new HashMap<>();
                options.put("folder","EducationsToys/" +  folderName);
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
                String publicId = (String) uploadResult.get("public_id");
                String secureUrl = cloudinary.url().secure(true).generate(publicId);
                imageUrls.add(secureUrl);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        
        return imageUrls;
    }
    
    
    
    public String getPublicId(String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            String path = url.getPath();
            return path.substring(path.indexOf("EducationsToys/") );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

   

}
