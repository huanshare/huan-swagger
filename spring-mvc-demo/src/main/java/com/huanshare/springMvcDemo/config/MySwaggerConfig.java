package com.huanshare.springMvcDemo.config;

import com.huanshare.huanSwaggerCore.core.EnableHuanSwagger;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * 配合单服务版本的Bean注入
 */
@Configuration
@EnableHuanSwagger
@EnableWebMvc
public class MySwaggerConfig {
}
