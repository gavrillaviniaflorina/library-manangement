package ro.librarymanager.librarymanagerapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookExistsExcepion extends RuntimeException{

    public BookExistsExcepion(String msg){
         super(msg);
    }
}
