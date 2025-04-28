package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	public User findByEmail(String username);

}
