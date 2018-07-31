package com.huanshare.huanSwaggerTest.controller.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuhuan on 2018/7/20 13:44.
 */
@Getter
@Setter
@ApiModel(description = "获取用户信息返回Dto")
public class GetUserInfoResponseDto {
    @ApiModelProperty(value = "用户信息列表")
    private List<UserInfoDto> userInfoList=new ArrayList<>();
}
