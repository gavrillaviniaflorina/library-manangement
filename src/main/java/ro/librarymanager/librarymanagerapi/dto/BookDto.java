package ro.librarymanager.librarymanagerapi.dto;

import lombok.Data;

@Data
public class BookDto {

    private String title;
    private String author;
    private String gen;
    private int year;


    public BookDto(String title, String author, String genre, int i) {
        this.title=title;
        this.author=author;
        this.gen=genre;
        this.year=i;
    }
}
