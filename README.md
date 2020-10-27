# 将iPhone剪切板复制到win10剪切板
#### 描述 	

​	局域网下, 一键复制iPhone剪切板内容到Windows剪切板. 还能在分享菜单发送图片到win指定目录. 原理是,笔记本上创建一个web服务器, 接收手机上发来的带有文件的POST请求. 

​	注意: 此处为win10端的代码. 捷径链接如下:[捷径链接](https://www.icloud.com/shortcuts/941dac5c82674f57a91514d67bb4a7d7)

#### 使用

* 克隆代码到本地, 打开一个powershell将目录切换到项目根目录.

* 下载依赖

  ```shell
  npm install
  ```

* 开启服务

  ```shell
  npm start
  ```

* 查看win10计算机局域网ip

  * 方式1 在浏览器中打开http://localhost:4000/查看

  * 方式2 通过powershell查看

    ```powershell
    ipconfig
    ```

* 下载[捷径](https://www.icloud.com/shortcuts/941dac5c82674f57a91514d67bb4a7d7),修改捷径中ip地址为win10计算机局域网ip

* 在iPhone上点击分享按钮发送, Win10上就可以直接 ctrl+v 了. 

  * 也可以在捷径中直接运行,那将会发送iPhone剪切板中内容
  
  * 图片会被发送到
  
    ```
    C:\Users\%Username%\Pictures
    ```
  
    

