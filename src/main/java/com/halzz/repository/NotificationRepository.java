package com.halzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.halzz.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {



}
