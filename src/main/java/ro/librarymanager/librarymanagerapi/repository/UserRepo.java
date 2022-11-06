package ro.librarymanager.librarymanagerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.librarymanager.librarymanagerapi.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    @Query(value = "select * from user where email like ?1",nativeQuery = true)
    Optional<User> selectedEmailExists(String email);

    @Query(value="select * from user where id = ?1 ", nativeQuery = true)
    Optional<User> selectedIdExists(Long id);

    @Query(value = "select id from user where email =?1", nativeQuery = true)
    Optional<Long> findIdByUserName(String email);
}
