package com.huanshare.huanSwaggerUi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Description:
 * @USER:
 * @Date: 2018/4/23
 * @Time: 17:12
 * @version: 1.0
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //将所有/static/** 访问都映射到classpath:/static/ 目录下
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/webjars/");
        registry.addResourceHandler("/api-doc.html").addResourceLocations("classpath:/api-doc.html");

    }
}