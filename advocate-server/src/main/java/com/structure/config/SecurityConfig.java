package com.structure.config;

import com.structure.services.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountDetailsService ads;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder customPasswordEncoder(){
        return new PasswordEncoder(){
            @Override
            public String encode(CharSequence rawPassword){
                return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(10));
            }
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword){
                return BCrypt.checkpw(rawPassword.toString(), encodedPassword);
            }
        };
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(ads);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/authenticate", "/api/createuser", "/api/testing", "/api/logout")
            .permitAll()
            .anyRequest().authenticated()
            .and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

}