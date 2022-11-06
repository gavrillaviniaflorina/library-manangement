package ro.librarymanager.librarymanagerapi.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import ro.librarymanager.librarymanagerapi.dto.UserDto;
import ro.librarymanager.librarymanagerapi.jwt.JWTTokenProvider;
import ro.librarymanager.librarymanagerapi.model.User;
import ro.librarymanager.librarymanagerapi.service.UserService;

import static org.springframework.http.HttpStatus.OK;
import static ro.librarymanager.librarymanagerapi.constants.Utils.JWT_TOKEN_HEADER;



@RestController
@CrossOrigin
@RequestMapping(path = { "/", "/user"})
public class UserController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JWTTokenProvider jwtTokenProvider;

    public UserController(UserService userService, AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserDto user) {
        authenticate(user.getEmail(), user.getPassword());
        User loginUser = userService.findUserByEmail(user.getEmail());
        User userPrincipal = new User(loginUser.getEmail(), loginUser.getPassword());
        HttpHeaders jwtHeader = getJwtHeader(userPrincipal);
        return new ResponseEntity<>(loginUser, jwtHeader, OK);
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto user){
        this.userService.addUser(user);
        return  new ResponseEntity<>(user, OK);
    }

    private HttpHeaders getJwtHeader(User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));
        return headers;
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
