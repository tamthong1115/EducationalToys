package com.toyapp.backend.service;

import com.cloudinary.Cloudinary;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {
    
    @Resource
    private Cloudinary cloudinary;
    
    
    public String uploadFile(MultipartFile file, String folderName) {
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
    
    public void deleteCategoryImage(String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            String path = url.getPath();
            String publicId = path.substring(path.indexOf("EducationsToys/") );
            System.out.println(publicId);
            cloudinary.uploader().destroy(publicId, new HashMap<>());
            
//             cloudinary.api().deleteResources(Arrays.asList(publicId), new HashMap<>());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String uploadCategoryImage(MultipartFile file) {
        
        String url =  uploadFile(file, "categories");
        return url;
    }
}
