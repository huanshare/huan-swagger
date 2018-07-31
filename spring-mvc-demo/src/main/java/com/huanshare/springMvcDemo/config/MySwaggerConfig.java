package com.huanshare.springMvcDemo.config;

import com.huanshare.huanSwaggerCore.core.EnableHuanSwagger;
import com.huanshare.huanSwaggerCore.core.HuanSwagger;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.*;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableHuanSwagger
@Configuration
@EnableWebMvc
public class MySwaggerConfig  {
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

}
