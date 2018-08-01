package com.huanshare.huanSwaggerCore.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Created by liuhuan on 2018/7/20 9:49.
 */
@Configuration
public class HuanSwagger {
    @Value("${swagger.enable:true}")
    boolean enable;
    @Value("${swagger.title:API查看器}")
    String title;
    @Value("${swagger.description:API服务的说明，请在配置文件中说明服务的作用}")
    String description;
    @Value("${swagger.contact.name:huanshare}")
    String contactName;
    @Value("${swagger.contact.url:www.huanshare.com}")
    String contactUrl;
    @Value("${swagger.contact.mail:huanshare@live.com}")
    String contactMail;
    @Value("${swagger.version:0.0.0}")
    String version;

    public HuanSwagger() {
    }

    @Bean
    public Docket allApi() { if (!this.enable) {
            return (new Docket(DocumentationType.SWAGGER_2)).select().apis(RequestHandlerSelectors.none()).paths(PathSelectors.none()).build();
        } else {
            ApiInfo apiInfo = (new ApiInfoBuilder()).title(this.title).description(this.description).contact(new Contact(this.contactName, this.contactUrl, this.contactMail)).version(this.version).build();
            ApiSelectorBuilder builder = (new Docket(DocumentationType.SWAGGER_2)).useDefaultResponseMessages(false).apiInfo(apiInfo).select();
            builder.apis(RequestHandlerSelectors.withClassAnnotation(RestController.class));
            return builder.build();
        }
    }

    @Bean
    public CorsFilter apiCrosFilter() {
        if (!this.enable) {
            return new CorsFilter(new UrlBasedCorsConfigurationSource());
        } else {
            UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowCredentials(true);
            corsConfiguration.addAllowedHeader("*");
            corsConfiguration.addAllowedMethod("*");
            corsConfiguration.addAllowedOrigin("*");
            urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
            return new CorsFilter(urlBasedCorsConfigurationSource);
        }
    }
}
