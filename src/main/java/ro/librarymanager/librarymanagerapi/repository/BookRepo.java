package ro.librarymanager.librarymanagerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.librarymanager.librarymanagerapi.model.Book;

import java.util.Optional;

@Repository
public interface BookRepo extends JpaRepository<Book,Long> {


    @Query(value = "select b from Book b where b.title = ?1")
    Optional<Book> titleExists(String title);

}
