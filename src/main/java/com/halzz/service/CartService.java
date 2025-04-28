package com.halzz.service;

import com.halzz.exception.ProductException;
import com.halzz.model.Cart;
import com.halzz.model.CartItem;
import com.halzz.model.Product;
import com.halzz.model.User;

public interface CartService {
	
	public CartItem addCartItem(User user,
								Product product,
								String size,
								int quantity) throws ProductException;
	
	public Cart findUserCart(User user);

}
