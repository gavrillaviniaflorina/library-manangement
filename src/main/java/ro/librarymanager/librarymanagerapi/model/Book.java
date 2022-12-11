package ro.librarymanager.librarymanagerapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity(name="Book")
@Table(name="books")

@NoArgsConstructor
@AllArgsConstructor
public class Book implements Comparable {
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Id
    Long id;
    private String title;
    private String author;
    private String gen;
    private int year;


    public Book(String title, String author, String genre, int year) {

      this.title=title;
      this.author=author;
      this.gen=genre;
      this.year=year;
    }

    @Override
    public int compareTo(Object o) {

        Book book=(Book) o;
        return this.title.compareTo(book.title);
    }
}
