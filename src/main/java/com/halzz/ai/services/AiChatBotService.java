package com.halzz.ai.services;

import com.halzz.exception.ProductException;
import com.halzz.response.ApiResponse;

public interface AiChatBotService {

    ApiResponse aiChatBot(String prompt,Long productId,Long userId) throws ProductException;
}
