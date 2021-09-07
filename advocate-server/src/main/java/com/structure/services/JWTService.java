package com.structure.services;

import com.structure.models.AccountDetails;
import com.structure.repositories.JwtKeyRepo;
import com.structure.utilities.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class JWTService {

    @Autowired
    private JwtKeyRepo jkr;

    private String retrieveKey() {
        return jkr.getById(Constants.JWT_ID).getKey();
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(retrieveKey()).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String username){
//        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
//                .commaSeparatedStringToAuthorityList("ROLE_USER");

        return Jwts.builder()
                   .setClaims(claims)
/*                   .claim("authorities",
                           grantedAuthorities.stream()
                                             .map(GrantedAuthority::getAuthority)
                                             .collect(Collectors.toList()))*/
                   .setSubject(username)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + Constants.COOKIE_LIFE_MS)) //3 hours
                   .signWith(SignatureAlgorithm.HS256, retrieveKey())
                   .compact();
    }

    public boolean validateToken(String token, AccountDetails accountDetails){
        final String USERNAME = extractUsername(token);
        return (USERNAME.equals(accountDetails.getUsername()) && !isTokenExpired(token));
    }

    public void createAndAddJwtToCookie(String JWT, HttpServletResponse res){
        Cookie cookie = new Cookie("jwt", JWT);
        cookie.setMaxAge(Constants.COOKIE_LIFE_SECONDS);
        cookie.setHttpOnly(true);
        //cookie.setSecure(true);
        res.addCookie(cookie);
    }

    public Optional<Cookie> extractJwtFromCookie (HttpServletRequest request) throws NoSuchElementException {
        System.out.println("Extracting JWT from cookie..");
        if(request.getCookies() == null)
            return Optional.empty();

         return Arrays.stream(request.getCookies()).filter(cookie ->
                 cookie.getName().equals("jwt")).findFirst();
    }
    
    public String extractJwtAndEmailFromCookie(HttpServletRequest request){
        String jwt = extractJwtFromCookie(request).orElseThrow().getValue();
        String email = extractUsername(jwt);
        return email;
    }
}
