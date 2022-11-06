package ro.librarymanager.librarymanagerapi.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import ro.librarymanager.librarymanagerapi.dto.BookDto;
import ro.librarymanager.librarymanagerapi.exceptions.BookExistsExcepion;
import ro.librarymanager.librarymanagerapi.exceptions.BookNotFoundException;
import ro.librarymanager.librarymanagerapi.exceptions.NoBookFoundException;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.repository.BookRepo;
import static org.mockito.Mockito.doReturn;
import static org.mockito.BDDMockito.then;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class BookServiceTest {

    @Mock
    private BookRepo bookRepo;

    @Captor
    private ArgumentCaptor<Book> bookArgumentCaptor;

    private BookService underTest;

    private ModelMapper modelMapper=new ModelMapper();


    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
        underTest=new BookService(bookRepo);
    }

    @Test
    void itShouldGetAllBooks(){

        List<Book> bookList=new ArrayList<>();

        for(int i=0;i<10;i++){
            bookList.add(new Book());
        }

        doReturn(bookList).when(bookRepo).findAll();
        assertThat(underTest.getAll()).isEqualTo(bookList);
    }


    @Test
    void itShouldNotGetAllBooks(){
        List<Book> bookList=new ArrayList<>();
        doReturn(bookList).when(bookRepo).findAll();

        assertThatThrownBy(()->underTest.getAll()).isInstanceOf(NoBookFoundException.class).hasMessageContaining( "No book found");

    }



    @Test
    void itShouldAddBook(){



        BookDto bookDto=new BookDto("Ion","Liviu Rebreanu","drama",1920);

        doReturn(Optional.empty()).when(bookRepo).titleExists(bookDto.getTitle());

        underTest.addBook(bookDto);

        then(bookRepo).should().save(bookArgumentCaptor.capture());
        Book book=bookArgumentCaptor.getValue();
        BookDto bookDto1=new BookDto(book.getTitle(),book.getAuthor(),book.getGen(),book.getYear());
        assertThat(bookDto1).isEqualTo(bookDto);

    }


    @Test
    void isShouldNotSaveBook(){
        BookDto bookDto=new BookDto("Ion","Liviu Rebreanu","drama",1920);
        doReturn(Optional.of(bookDto)).when(bookRepo).titleExists(bookDto.getTitle());
        assertThatThrownBy(()->underTest.addBook(bookDto)).isInstanceOf(BookExistsExcepion.class).hasMessageContaining("The book "+bookDto.getTitle()+" exists");

    }

    @Test
    void itShouldDeleteBook(){
        Book book=new Book("w","e","q",12);
        book.setId(337L);


        doReturn(true).when(bookRepo).existsById(337L);
        underTest.deleteBook(book.getId());

        BDDMockito.then(bookRepo).should().deleteById(book.getId());


    }

    @Test
    public void itShouldNotDeleteABook(){
        Book book=new Book(1L,"Ion","Liviu Rebreanu","drama",1920);

        doReturn(Optional.empty()).when(bookRepo).titleExists(book.getTitle());

        assertThatThrownBy(()->underTest.deleteBook(book.getId())).isInstanceOf(BookNotFoundException.class).hasMessageContaining("The book does not exist");


    }


    @Test
    public void itShouldNotUpdatePerson(){
        BookDto book=new BookDto("w","e","q",12);

        doReturn(false).when(bookRepo).existsById(337L);
        doReturn(Optional.empty()).when(bookRepo).findById(337L);

        assertThatThrownBy(()->underTest.updateBook(book)).isInstanceOf(BookNotFoundException.class).hasMessageContaining("The book does not exist");

    }
}


