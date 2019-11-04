# Linux搭建后台服务器

卸载node

```csharp
	sudo apt-get remove --purge npm
    sudo apt-get remove --purge nodejs
    sudo apt-get remove --purge nodejs-legacy
    sudo apt-get autoremove
```



安装node

```csharp
    # apt-get 安装 nodejs
    sudo apt-get install nodejs
    sudo apt-get install nodejs-legacy
    nodejs -v # v0.10.25

    # 安装最新的 node v10.x 
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    node -v # v10.14.1
```



[安装yarn](https://yarn.bootcss.com/docs/install/#debian-stable)

[设置Ubuntu环境变量](https://blog.csdn.net/vertor11/article/details/70799971)

