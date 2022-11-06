package ro.librarymanager.librarymanagerapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import ro.librarymanager.librarymanagerapi.LibraryManagerApiApplication;
import ro.librarymanager.librarymanagerapi.dto.BookDto;
import ro.librarymanager.librarymanagerapi.model.Book;
import ro.librarymanager.librarymanagerapi.repository.BookRepo;
import ro.librarymanager.librarymanagerapi.service.BookService;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryManagerApiApplication.class)
@AutoConfigureMockMvc
class BookControllerTest {

    @MockBean
    private BookRepo mockBookRepo;

    @MockBean
    private BookService mockBookService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getBooks() throws Exception {

        List<Book> books=new ArrayList<>();
        Book book1=new Book("test1","autor1","gen1",2022);
        books.add(book1);
        when(mockBookService.getAll()).thenReturn(books);

        ObjectMapper mapper=new ObjectMapper();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/books")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(mapper.writeValueAsString(books)));

    }

    @Test
    void addBook() throws Exception {

        ObjectMapper mapper=new ObjectMapper();
        Book book=new Book("test2","autor2","gen2",2022);
        book.setId(1L);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/books/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.valueOf(mapper.writeValueAsString(book))))
                .andExpect(status().isOk());

    }

    @Test
    void updateBook() throws Exception {
        ObjectMapper mapper=new ObjectMapper();

        BookDto book=new BookDto("test2","autor3","gen2",2022);
        Book book1=new Book(1L,book.getTitle(),book.getAuthor(),book.getGen(),book.getYear());

        when(mockBookService.findBook(1L)).thenReturn(book1);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/books/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.valueOf(mapper.writeValueAsString(book))))
                .andExpect(content().string(mapper.writeValueAsString(book1)))
                .andExpect(status().isOk());
    }

    @Test
    void findBookById() throws Exception {

        ObjectMapper mapper=new ObjectMapper();
        Book book=new Book("test4","autor4","gen",2021);
        book.setId(1L);
        when(mockBookService.findBook(1L)).thenReturn(book);

        mockMvc.perform(MockMvcRequestBuilders.get(String.format("/api/v1/books/findBook/%d",1L))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(content().string(mapper.writeValueAsString(book)));
    }

    @Test
    void deleteBook() throws Exception {


        Book book=new Book("test5","autor","gen",2019);
        book.setId(1L);
        when(mockBookService.findBook(1L)).thenReturn(book);

        mockMvc.perform(MockMvcRequestBuilders.delete(String.format("/api/v1/books/delete/%d",1L))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }


}