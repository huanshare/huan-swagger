package com.huanshare.huanSwaggerTest;

import com.huanshare.huanSwaggerCore.core.EnableHuanSwagger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableHuanSwagger
public class HuanSwaggerTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(HuanSwaggerTestApplication.class, args);
    }
}
