package ro.librarymanager.librarymanagerapi;


import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.repository.BookRepo;

@SpringBootApplication
public class LibraryManagerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagerApiApplication.class, args);
    }



    @Bean
    CommandLineRunner commandLineRunner(
            BookRepo bookBookRepo){
        return args -> {
            Faker faker=new Faker();


            for(int i=0;i<=5;i++){
                Book b=new Book(faker.book().title(),faker.book().author(),faker.book().genre(),(int)(Math.random()*2000+1000));
                bookBookRepo.save(b);
            }
        };

    }




}
