package com.halzz.service;


import com.halzz.exception.WishlistNotFoundException;
import com.halzz.model.Product;
import com.halzz.model.User;
import com.halzz.model.Wishlist;

public interface WishlistService {

    Wishlist createWishlist(User user);

    Wishlist getWishlistByUserId(User user);

    Wishlist addProductToWishlist(User user, Product product) throws WishlistNotFoundException;

}

