package ro.librarymanager.librarymanagerapi.repository.service;

import org.springframework.stereotype.Service;
import ro.librarymanager.librarymanagerapi.dto.BookDto;
import ro.librarymanager.librarymanagerapi.exceptions.BookExistsExcepion;
import ro.librarymanager.librarymanagerapi.exceptions.BookNotFoundException;
import ro.librarymanager.librarymanagerapi.exceptions.NoBookFoundException;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.repository.BookRepo;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookService {

    private BookRepo bookRepo;

    public BookService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }


    public List<Book> getAll(){
       List<Book> books= this.bookRepo.findAll();


       if(books.size()==0){
           throw new NoBookFoundException(
                   "No book found"
           );
       }

       return books;
    }

    public void addBook(BookDto book){

        Boolean bookExists=this.bookRepo.titleExists(book.getTitle()).isPresent();
        if(bookExists){
            throw new BookExistsExcepion(

                    "The book "+book.getTitle()+" exists"
            );
        }

        bookRepo.save(new Book(book.getTitle(),book.getAuthor(),book.getGen(),book.getYear()));
    }


    public void deleteBook(Long id){

        Boolean bookExists=this.bookRepo.existsById(id);

        if(!bookExists){
            throw  new BookNotFoundException(

                    "The book does not exist"
            );
        }

        bookRepo.deleteById(id);

    }

    public void updateBook(BookDto updatedBook){
        Boolean bookExists=this.bookRepo.titleExists(updatedBook.getTitle()).isPresent();
        if(!bookExists){
            throw new BookNotFoundException(
                    "The book does not exist"
            );
        }

        Book bookHelper=this.bookRepo.titleExists(updatedBook.getTitle()).get();


        this.bookRepo.findById(bookHelper.getId()).map(book -> {


            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setGen(updatedBook.getGen());
            book.setYear(updatedBook.getYear());


            return bookRepo.save(book);
        });
    }

    public Book findBook(Long id){
        Boolean bookExists=bookRepo.findById(id).isPresent();

        if(!bookExists){
            throw new BookNotFoundException(

                    "The book does not exist"
            );

        }else{

            return bookRepo.findById(id).get();
        }

    }

    public List<Book>sortByName(){
        List<Book> bookList=bookRepo.findAll().stream().sorted(Comparator.comparing(Book::getTitle)).collect(Collectors.toList());
        return bookList;
    }




}
