package com.halzz.service;

import com.halzz.model.Home;
import com.halzz.model.HomeCategory;

import java.util.List;

public interface HomeService {

    Home getHomePageData();
    Home creatHomePageData(List<HomeCategory> categories);

}
