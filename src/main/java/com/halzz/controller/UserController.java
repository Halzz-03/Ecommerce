package com.halzz.controller;

import com.halzz.model.User;
import com.halzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.halzz.exception.UserException;

import com.halzz.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	@Autowired
	private  UserRepository userRepository;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(
			@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
	}
	@PatchMapping("/update-profile")
	public ResponseEntity<String> updateCustomerProfile(
			@RequestHeader("Authorization") String jwt,
			@RequestBody User updatedUser
	) throws Exception {
		User profile = userService.findUserProfileByJwt(jwt);

		profile.setFullName(updatedUser.getFullName());
		profile.setEmail(updatedUser.getEmail());
		profile.setMobile(updatedUser.getMobile());

		userRepository.save(profile);

		return ResponseEntity.ok("Profile updated successfully");
	}







}
