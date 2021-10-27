<h1 align='center'>git命令</h1>
#### 远程相关

##### 查看远程仓库

`git remote -v`

##### 配置别名

`git remote add 别名 https://github.com/xxxxx`

##### 查看更多信息

`git remote show 别名`

##### 重命名

`git remote rename pb paul`

##### 移除远程仓库

`git remote rm [remote-name]`

##### 推送到远程仓库

`git push [remote-name] [branch-name]`

##### 克隆到本地

`git clone url（克隆时不需要 git init）`

##### 拉取成员提交内容

`git fetch [remote-name]`

##### 创建并切换分支

`git checkout -b branchName`

##### 切换分支

`git checkout branchName`

##### 删除分支

 `git branch -d branchName`

##### 强行删除分支

`git branch -D branchName`

##### 重命名本地分支

`git branch -m oldbranchname newbranchname`

##### 根据远程分支生成的本地分支(拉取远程分支)

`git checkout -b branchName  origin/branchName`

##### 查看拉取的分支

`git log -p FETCH_HEAD`

##### 拉取成员提交内容并合并

`git pull [remote-name] [branch-name]`

##### 删除分支

`git branch -d`

##### 查看已合并的分支

`git branch --merge `

##### 查看可合并的分支

`git branch --no-merge `

##### 合并分支(在主分支合并其他分支)

`git merge`

##### 查看两个版本的差异

`git diff branch1 branch2 [-stat]`

##### 查看本地的改动（还未提交）

`git diff `

##### 查看一个文件的改动

`git log -p file`

`git log --pretty=oneline 文件名`

##### 查看某条改动

`git show 356f6def9d3fb7f3b9032ff5aa4b9110d4cca87e`

#### 本地相关

##### 查看所有已跟踪的文件

`git ls-tree -r master --name-only`

##### 取消对文件的跟踪，并保留在本地

`git rm --cached filename`

#### 底层命令

##### 向数据库写入内容，并返回键值

`echo 'test content' | git hash-object -w --stdin`

```
-w: 写入
——stdin: 从标准输入读取内容
```

#### 查看版本

##### 察看版本的详细信息

`git log`

##### 一行显示

`git log --pretty=oneline`

`git log --oneline`

##### 查看所有的版本信息（简单显示）

`git reflog`



#### 切换版本

##### 基于索引值切换版本

`git reset [--hard|--soft] 8a58522`

* --hard 回退了版本，工作区，暂存区

* --mixed 回退了版本，暂存区（默认）

* --soft 回退了版本

##### 步进回退

* 一个`^`代表回退一个版本

`git reset [--hard|--soft] HEAD^^^ `

##### 跨越回退

* `~3`表示回退3个版本

`git reset [--hard|--soft] HEAD~3`



##### 清理已删掉的分支

`git fetch --prune`

#### 标签操作

 **查看本地分支标签** 

```sh
git tag

或者

git tag -l

或者

git tag --list
```

**查看远程所有标签**

```sh
git ls-remote --tags

或者

git ls-remote --tag
```

**给当前分支打标签**

```sh
git tag 《标签名》

例如

git tag v1.1.0
```

 

 **给特定的某个commit版本打标签，比如现在某次提交的id为 039bf8b** 

```sh
git tag v1.0.0 039bf8b

或者可以添加注释

git tag v1.0.0 -m "add tags information" 039bf8b

或者

git tag v1.0.0 039bf8b -m "add tags information"
```

 **删除本地某个标签** 

```sh
git tag --delete v1.0.0

或者

git tag -d v1.0.0

或者

git tag --d v1.0.0
```

 **删除远程的某个标签** 

```sh
git push -d origin v1.0.0

或者

git push --delete origin v1.0.0

或者

git push origin -d v1.0.0

或者

git push origin --delete v1.0.0

或者

git push origin :v1.0.0
```

 **将本地标签一次性推送到远程** 

```sh
git push origin --tags

或者

git push origin --tag

或者

git push --tags

或者

git push --tag
```

 **将本地某个特定标签推送到远程** 

```sh
git push origin v1.0.0
```

 **查看某一个标签的提交信息** 

```sh
git show v1.0.0
```

##### 443问题解决

刷新DNS

```
ipconfig/flushdns
```
测试ssh连接，刷新ssh连接设置
```
$ ssh -vT git@github.com
```
使用了代理，git pull 错误
```
git config --global --add remote.origin.proxy ""
```

查看可用节点,修改HOST文件

```
http://ping.chinaz.com/github.com
```



##### 部署的公钥私钥

```
ssh-keygen -f github-deploy-key
```





git问题整理方法

1.http://ping.chinaz.com/

github.com

github.global.ssl.Fastly.net

assets-cdn.github.com



新建 github.bat 检测git关键域名的连通情况，根据情况[查找相应域名](http://ping.chinaz.com/)的可连接IP，修改HOST文件

```bash
ipconfig/flushdns
ping github.global.ssl.Fastly.net
ping assets-cdn.github.com
ping github.com
pause
```





