package com.structure.utilities;

import com.structure.models.Teacher;
import com.structure.repositories.JwtKeyRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTUtil {

    public JWTUtil(){}

    @Autowired
    private JwtKeyRepo jkr;

    private String retrieveKey() {
        return jkr.getById("1").getKey();
    }

    public String extractEmail(String token){
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

    public String generateToken(Teacher teacher){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, teacher.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 3)) //3 hours
                .signWith(SignatureAlgorithm.HS256, retrieveKey()).compact();
    }

    public boolean validateToken(String token, Teacher teacher){
        final String EMAIL = extractEmail(token);
        return (EMAIL.equals(teacher.getUsername()) && !isTokenExpired(token));
    }


}
