package ro.librarymanager.librarymanagerapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.librarymanager.librarymanagerapi.dto.BookDto;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.service.BookService;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooks(){
        return  new ResponseEntity<List<Book>>(bookService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<Book> addBook(@RequestBody BookDto book){
        this.bookService.addBook(book);
        Book newBook = this.bookService.getBookByTitle(book.getTitle());

        return new ResponseEntity<>(newBook,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public  ResponseEntity<Book> updateBook(@RequestBody BookDto book,@PathVariable Long id){
     this.bookService.updateBook(book);
     return  new ResponseEntity<Book>(this.bookService.findBook(id),HttpStatus.OK);
    }

    @GetMapping("/findBook/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable Long id){
        return new ResponseEntity<>(this.bookService.findBook(id),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id){

        Book book=bookService.findBook(id);
          this.bookService.deleteBook(id);
          return  new ResponseEntity<>(book,HttpStatus.OK);
    }

//    @GetMapping("/sort")
//    public ResponseEntity<List<Book>> sortBooksByTitile(){
//        return new ResponseEntity<List<Book>>(bookService.sortByName(),HttpStatus.OK);
//    }
}
