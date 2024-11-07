package com.toyapp.backend.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    
    String CLOUDINARY_URL= dotenv.get("CLOUDINARY_URL");
    @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(CLOUDINARY_URL);
    }
}
