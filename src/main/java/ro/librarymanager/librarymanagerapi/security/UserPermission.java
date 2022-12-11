package ro.librarymanager.librarymanagerapi.security;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserPermission {
    BOOK_READ("book:read"),
    BOOK_WRITE("book:write");

    private String permission;
    public String getPermission(){ return permission;}

}
