package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
