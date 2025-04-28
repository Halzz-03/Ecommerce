package com.halzz.response;

import com.halzz.dto.OrderHistory;
import com.halzz.model.Cart;
import com.halzz.model.Product;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FunctionResponse {
    private String functionName;
    private Cart userCart;
    private OrderHistory orderHistory;
    private Product product;
}
