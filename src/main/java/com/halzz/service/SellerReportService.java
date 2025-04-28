package com.halzz.service;

import com.halzz.model.Seller;
import com.halzz.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport( SellerReport sellerReport);

}
