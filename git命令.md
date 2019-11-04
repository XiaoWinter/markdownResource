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

`git remote rm [remote-name]`--

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

