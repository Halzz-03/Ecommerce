package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
