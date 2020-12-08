package com.huanshare.huanSwaggerTest.controller.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;


/**
 * Created by liuhuan on 2018/7/20 13:44.
 */

@ApiModel(description = "获取用户信息请求Dto")
public class GetUserInfoRequestDto {
    @ApiModelProperty(value = "关键字")
    private String userKeyword;

    @ApiModelProperty(value = "用户名")
    private String userName;

    @ApiModelProperty(value = "年龄")
    private String age;

    @ApiModelProperty(value = "创建时间")
    private String createdTime;

    public String getUserKeyword() {
        return userKeyword;
    }

    public void setUserKeyword(String userKeyword) {
        this.userKeyword = userKeyword;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }
}
