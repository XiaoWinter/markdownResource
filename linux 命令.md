## linux 命令

#### 文件操作

###### 移动文件与目录，或改名

`mv fn1 fn2`

###### 新建目录

`mkdir`

###### 新建文件

`vim filename`

递归强制删除根目录下所有文件和目录

`rm / -rf`

强制删除某文件或目录

`rm filename(dirname) -f`

复制文件或目录

`cp fileA fileB`

#### 查看文件

正着看

`cat fileName`

反着看

`tac fileName`

显示行号

`nl fileName`

一页一页看

`less fileName`

看头

`head [-n num] fileName`

看尾

`tail [-n num] fileName`

### linux yum 命令(原生)



```
yum [options] [command] [package ...]

options：可选，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。
command：要进行的操作。
package操作的对象。
```



下载软件

`yum install <package_name>`

更新软件

`yum update <package_name>`

删除软件

`yum remove <package_name>`

查找软件

`yum search <keyword>`

列出可以安装的软件清单

`yum list`



### Ubuntu命令

安装软件

`apt-get install package_name`

重新安装

`apt-get install package –reinstall`

修复安装

`apt-get -f install package`



删除软件包括配置

`apt-get remove package_name -purge`

搜索软件

`apt-cache search <keyword>`

获取包相关信息

`apt-cache show package `

#### Windos命令

 `netstat -aon|findstr 4000` 找到PID

`tasklist|findstr “PID”` 获取程序名

`taskkill` 杀死程序

`taskkill -pid PID -f`  PID 为进程ID

