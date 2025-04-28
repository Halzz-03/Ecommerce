package com.halzz.repository;

import com.halzz.model.Cart;
import com.halzz.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);


}
