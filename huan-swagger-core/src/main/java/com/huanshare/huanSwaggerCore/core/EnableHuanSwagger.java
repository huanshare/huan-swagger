package com.huanshare.huanSwaggerCore.core;

import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.lang.annotation.*;

/**
 * Created by liuhuan on 2018/7/20 9:47.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@EnableSwagger2
@Import({HuanSwagger.class})
public @interface EnableHuanSwagger {
}
