package com.huanshare.huanSwaggerTest.controller.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuhuan on 2018/7/20 13:44.
 */

@ApiModel(description = "获取用户信息返回Dto")
public class GetUserInfoResponseDto {
    @ApiModelProperty(value = "用户信息列表")
    private List<UserInfoDto> userInfoList=new ArrayList<>();

    public List<UserInfoDto> getUserInfoList() {
        return userInfoList;
    }

    public void setUserInfoList(List<UserInfoDto> userInfoList) {
        this.userInfoList = userInfoList;
    }
}
