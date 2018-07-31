package com.huanshare.springMvcDemo.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by liuhuan on 2018/7/20 13:44.
 */
@Getter
@Setter
@ApiModel(description = "获取用户信息请求Dto")
public class GetUserInfoRequestDto {
    @ApiModelProperty(value = "关键字")
    private String userKeyword;
}
