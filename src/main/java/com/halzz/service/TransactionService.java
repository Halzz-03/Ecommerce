package com.halzz.service;

import com.halzz.model.Order;
import com.halzz.model.Seller;
import com.halzz.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySeller(Seller seller);
    List<Transaction>getAllTransactions();
}
