package ro.librarymanager.librarymanagerapi.service;

import org.springframework.stereotype.Service;
import ro.librarymanager.librarymanagerapi.dto.UserDto;
import ro.librarymanager.librarymanagerapi.exceptions.UserExistsException;
import ro.librarymanager.librarymanagerapi.exceptions.UserNotFoundException;
import ro.librarymanager.librarymanagerapi.model.User;
import ro.librarymanager.librarymanagerapi.repository.UserRepo;

@Service
public class UserService {

    private UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(UserDto user){

        boolean userExists= this.userRepository.selectedEmailExists(user.getEmail()).isPresent();

        if(userExists){
            throw new UserExistsException("User exists");
        }
        this.userRepository.save(new User(user.getEmail(),user.getPassword()));
    }


    public User findUserByEmail(String email){

        boolean userExists = this.userRepository.selectedEmailExists(email).isEmpty();

        if(userExists){
            throw  new UserNotFoundException("User not found");
        }

        return  this.userRepository.selectedEmailExists(email).get();
    }

    public Long findIdByUserName(String email){
        boolean idExists = this.userRepository.findIdByUserName(email).isEmpty();

        if(idExists){
            throw  new UserNotFoundException("User not found");
        }

        return this.userRepository.findIdByUserName(email).get();

    }
}
