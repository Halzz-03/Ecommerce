package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	 Cart findByUserId(Long userId);
}
