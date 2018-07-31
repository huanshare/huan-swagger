package com.huanshare.springMvcDemo.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by liuhuan on 2018/7/20 13:46.
 */
@Getter
@Setter
@ApiModel(description = "用户信息")
public class UserInfoDto {
    @ApiModelProperty(value = "ID")
    private String id;

    @ApiModelProperty(value = "用户名")
    private String userName;

    @ApiModelProperty(value = "年龄")
    private String userAge;

    @ApiModelProperty(value = "身高")
    private String userHeight;

    @ApiModelProperty(value = "体重")
    private String userWeight;

    @ApiModelProperty(value = "创建时间")
    private String createTime;
}
