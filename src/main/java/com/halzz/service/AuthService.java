package com.halzz.service;

import com.halzz.exception.SellerException;
import com.halzz.exception.UserException;
import com.halzz.request.LoginRequest;
import com.halzz.request.SignupRequest;
import com.halzz.response.AuthResponse;
import jakarta.mail.MessagingException;

public interface AuthService {

    void sentLoginOtp(String email) throws UserException, MessagingException;
    String createUser(SignupRequest req) throws SellerException;
    AuthResponse signin(LoginRequest req) throws SellerException;

}
