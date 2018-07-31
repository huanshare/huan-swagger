# huan-swagger
## 项目描述
  由于考虑到大家的使用情况，结合网上 swagger-ui-layer的封装情况
  现把 swagger-layui 分为 微服务版，单服务版。目前只支持 RestController
  
  1）微服务版本：微服务与 layui 分离，layui 部署到新服务器上，供各个服务使用
  
        demo例子：http://106.12.9.238:8080/webjars/swagger-ui/index.html#106.12.9.238:8081
  
  2）单服务版本：layui 部署在服务上，即插即用，非常方便



## 项目结构
 huan-swagger-core  swagger核心组件封装
 
 swagger-ui-layer   单服务版本：供单服务即插即用
 
 huan-swagger-ui    微服务版本：swagger UI页面，作为一个第三方服务来渲染接口，用来渲染远程服务器的接口说明  （aa.com）
 
 spring-boot-demo  swagger 微服务测试页面  （bb.com）
 
 spring-mvc-demo   swagger spring mvc单服务测试页面  （bb.com）
 
 微服务访问形式：http://aa.com/webjars/swagger-ui/index.html#http://bb.com
 
 微服务demo实例：http://106.12.9.238:8080/webjars/swagger-ui/index.html#106.12.9.238:8081

## 使用说明
 一、微服务版本：
 
 1、部署到服务器上：huan-swagger-ui项目
 
 2、微服务项目修改
 
   1） pom依赖
     
       <dependency>
           <groupId>com.github.huanshare</groupId>
           <artifactId>huan-swagger-core</artifactId>
           <version>1.0.1</version>
       </dependency>
       
   2） spring boot项目启动项添加：
 
    @EnableHuanSwagger
    
   3） application.yml配置 (可选项配置)
 
     # Swagger设置  enable 默认为true,为false时，关闭接口展示
     swagger:
       enable: true,
       version: 版本号
       title: 项目标题
       description: 项目描述
       contact:
         name: 用户名
         url: url地址
         mail: 邮箱

 3、页面访问：UI服务器地址/webjars/swagger-ui/index.html#API-服务器地址
 
 4、具体使用方式，请参考 huan-swagger-test
 
  二、单服务版本：
  
  1、服务项目修改
     
   1） pom依赖
   
     <dependency>
       <groupId>com.github.huanshare</groupId>
       <artifactId>swagger-ui-layer</artifactId>
       <version>1.0.0</version>
     </dependency>
     
   2） spring boot项目启动项添加：
      
         @EnableHuanSwagger
     
   3） application.yml配置 (可选项配置)
  
      # Swagger设置  enable 默认为true,为false时，关闭接口展示
      swagger:
        enable: true,
        version: 版本号
        title: 项目标题
        description: 项目描述
        contact:
          name: 用户名
          url: url地址
          mail: 邮箱
 
  3、页面访问：UI服务器地址/api-doc.html
 
 ## 特点
  
   原来看过其他小伙伴的源码，页面交互不算太理想
  
   无论单机版还是微服务版，整体UI在小伙伴基础上做了一些修改，整体内容进行了封装，不需要配置一些额外的选项，即插即用，非常方便
  
   微服务版：实现了API与UI的分离，但是需要为UI单独部署一套服务器，增加了其他成本；如果微服务多的话，这也算是个不错的方案
   
   单服务版：简单配置，即插即用，非常方便
  
        小伙伴的地址（https://github.com/ohcomeyes/swagger-ui-layer ）
  
   
