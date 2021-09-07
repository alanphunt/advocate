package com.structure.config;

import com.structure.models.AccountDetails;
import com.structure.services.JWTService;
import com.structure.services.AccountDetailsService;
import com.structure.utilities.AccountDetailsRequestBean;
import com.structure.utilities.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired private JWTService jwtService;
    @Autowired private AccountDetailsService ads;
    @Autowired private AccountDetailsRequestBean detailsBean;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Filtering incoming request..");
        Optional<Cookie> jwtCookie = jwtService.extractJwtFromCookie(httpServletRequest);
        String username = null;
        String jwt = null;
        try {
            if (jwtCookie.isPresent()) {
                jwt = jwtCookie.get().getValue();
                username = jwtService.extractUsername(jwt);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                AccountDetails accountDetails = (AccountDetails) ads.loadUserByUsername(username);
                if (jwtService.validateToken(jwt, accountDetails)) {
                    UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(accountDetails, null, accountDetails.getAuthorities());
                    upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(upat);
                    detailsBean.setAccountDetails(accountDetails);
                }
            }
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch(Exception e){
            System.out.println(e.getMessage());
            httpServletResponse.sendError(Constants.HTTP_UNAUTHORIZED);
        }
    }
}