package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
