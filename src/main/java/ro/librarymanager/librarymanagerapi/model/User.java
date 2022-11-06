package ro.librarymanager.librarymanagerapi.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ro.librarymanager.librarymanagerapi.security.UserPermission;
import ro.librarymanager.librarymanagerapi.security.UserRole;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity(name="User")
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Id
    Long id;
    private String email;
    private String password;

    public User(String email, String password) {
        this.email = email;
        this.password = new BCryptPasswordEncoder().encode(password);
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return UserRole.USER.getGrantedAuthrities();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
