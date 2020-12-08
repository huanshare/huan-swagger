package com.huanshare.huanSwaggerTest.controller;



import com.huanshare.huanSwaggerTest.controller.dto.GetUserInfoRequestDto;
import com.huanshare.huanSwaggerTest.controller.dto.GetUserInfoResponseDto;
import com.huanshare.huanSwaggerTest.controller.dto.UserInfoDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by liuhuan on 2018/7/12 10:05.
 */
@RestController
@RequestMapping("/test")
@Api(tags = "查询个人信息", description = "查询个人汇总")
public class TestController {

    @ApiOperation(notes = "post json请求", value = "post json请求")
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.POST)
    public ResponseEntity<GetUserInfoResponseDto> openAccount(@RequestBody GetUserInfoRequestDto requestDto) {
        GetUserInfoResponseDto responseDto=new GetUserInfoResponseDto();
        List<UserInfoDto> userInfoList=new ArrayList<>();
        UserInfoDto userInfoDto=null;
        for (int i=0;i<100;i++){
            userInfoDto=new UserInfoDto();
            userInfoDto.setId(String.valueOf(i));
            userInfoDto.setUserName("huan"+i);
            userInfoDto.setUserAge(String.valueOf(10+i));
            userInfoDto.setUserHeight(String.valueOf(160+i));
            userInfoDto.setUserWeight(String.valueOf(60+i));
            userInfoDto.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            userInfoList.add(userInfoDto);
        }
        responseDto.setUserInfoList(userInfoList);
        return ResponseEntity.ok(responseDto);


    }


    @ApiOperation(notes = "提交form表单", value = "提交form表单")
    @RequestMapping(value = "/getUserInfo2", method = RequestMethod.POST)
    public ResponseEntity<GetUserInfoResponseDto> getUserInfo2(GetUserInfoRequestDto requestDto) {
        return ResponseEntity.ok(new GetUserInfoResponseDto());
    }

    @ApiOperation(value = "文件上传（MultipartFile+Form表单）", notes = "文件上传（MultipartFile+Form表单）")
    @PostMapping(value = "/upload", consumes = "multipart/*", headers = "content-type=multipart/form-data")
    public ResponseEntity<String> upload(@ApiParam(value = "文件上传", required = true) MultipartFile fileHandler, GetUserInfoRequestDto requestDto) {
        if (fileHandler==null || fileHandler.isEmpty()) {
            return ResponseEntity.ok("{\"code\":\"-1\",\"msg\":\"文件上传失败！\"}");
        }
        System.out.println("name: " + fileHandler.getOriginalFilename() + "  size: " + fileHandler.getSize());

        String pathName = "D:\\image\\";
        String picFullFileName = pathName + UUID.randomUUID().toString() + "_" + fileHandler.getOriginalFilename();
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(picFullFileName);
            // 写入文件
            fos.write(fileHandler.getBytes());
            return ResponseEntity.ok("{\"code\":\"1\",\"msg\":\"文件上传成功！\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("{\"code\":\"-1\",\"msg\":\"文件上传失败！\"}");
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


}
