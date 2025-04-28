package com.halzz.service;

import com.halzz.exception.UserException;
import com.halzz.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public User findUserByEmail(String email) throws UserException;


}
