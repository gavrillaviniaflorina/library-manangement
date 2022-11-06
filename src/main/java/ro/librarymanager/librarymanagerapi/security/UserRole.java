package ro.librarymanager.librarymanagerapi.security;

import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static ro.librarymanager.librarymanagerapi.security.UserPermission.BOOK_READ;
import static ro.librarymanager.librarymanagerapi.security.UserPermission.BOOK_WRITE;

@AllArgsConstructor
public enum UserRole {
    USER(Sets.newHashSet(BOOK_READ, BOOK_WRITE));

    private final Set<UserPermission> permissions;
    public Set<UserPermission> getPermissions(){return  permissions;}

    public Set<SimpleGrantedAuthority> getGrantedAuthrities(){
        Set<SimpleGrantedAuthority> collect=getPermissions()
                .stream()
                .map(e->new SimpleGrantedAuthority(e.getPermission()))
                .collect(Collectors.toSet());

        collect.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return collect;
    }
}
