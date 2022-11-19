package ro.librarymanager.librarymanagerapi;


import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.model.User;
import ro.librarymanager.librarymanagerapi.repository.BookRepo;
import ro.librarymanager.librarymanagerapi.repository.UserRepo;

import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class LibraryManagerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagerApiApplication.class, args);
    }



    @Bean
    CommandLineRunner commandLineRunner(
            BookRepo bookRepo,
            UserRepo userRepo){
        return args -> {
//            Faker faker=new Faker();
//
//
//            User user =new User("lavinia.gavril@gamil.com","123");
//            userRepo.save(user);
//            for(int i=0;i<=5;i++){
//                Book b=new Book(faker.book().title(),faker.book().author(),faker.book().genre(),(int)(Math.random()*2000+1000));
//                bookRepo.save(b);
//            }
        };

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }



}
