# Shell入门

在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 **#!/bin/sh**，它同样也可以改为 **#!/bin/bash**。

**#!** 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

```shell
#!/bin/bash
echo "Hello World !"
```

**echo** 命令用于向窗口输出文本。

### :heavy_check_mark: 运行 Shell 脚本有两种方法：

**1、作为可执行程序**

将上面的代码保存为 test.sh，并 cd 到相应目录：

```shell
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```

注意，一定要写成 **./test.sh**，而不是 **test.sh**，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。



**2、作为解释器参数**

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```shell
/bin/sh test.sh
/bin/php test.php
```



### :warning: sh/bash/csh/Tcsh/ksh/pdksh等shell的区别

- 

  sh(全称 Bourne Shell)

  : 是UNIX最初使用的 shell，而且在每种 UNIX 上都可以使用。

  Bourne Shell 在 shell 编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种 shell。

  

- **bash（全称 Bourne Again Shell）**: LinuxOS 默认的，它是 Bourne Shell 的扩展。 与 Bourne Shell 完全兼容，并且在 Bourne Shell 的基础上增加了很多特性。可以提供命令补全，命令编辑和命令历史等功能。它还包含了很多 C Shell 和 Korn Shell 中的优点，有灵活和强大的编辑接口，同时又很友好的用户界面。

- **csh(全称 C Shell)**: 是一种比 Bourne Shell更适合的变种 Shell，它的语法与 C 语言很相似。

- **Tcsh**: 是 Linux 提供的 C Shell 的一个扩展版本。
  Tcsh 包括命令行编辑，可编程单词补全，拼写校正，历史命令替换，作业控制和类似 C 语言的语法，他不仅和 Bash Shell 提示符兼容，而且还提供比 Bash Shell 更多的提示符参数。

- **ksh (全称 Korn Shell)**: 集合了 C Shell 和 Bourne Shell 的优点并且和 Bourne Shell 完全兼容。

-  **pdksh**: 是 Linux 系统提供的 ksh 的扩展。
  pdksh 支持人物控制，可以在命令行上挂起，后台执行，唤醒或终止程序。



### :heavy_check_mark: shell变量

定义变量时，变量名不加美元符号（$，PHP语言中变量需要），如：

```shell
your_name="dawinter"
```

##### 定义规则

- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线 **_**。
- 不能使用标点符号。
- 不能使用bash里的关键字（可用help命令查看保留关键字）。

有效的变量名

```shell
RUNOOB
LD_LIBRARY_PATH
_var
var2
```



无效的变量名

```shell
?var=123
user*name=runoob
```



除了显式地直接赋值，还可以用语句给变量赋值，如：

这个不会用

```shell
for file in `ls /etc`
或
for file in $(ls /etc)
```



##### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

```shell
your_name="qinjx"
echo $your_name
echo ${your_name}
```

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，比如下面这种情况：

```shell
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done
```

如果不给skill变量加花括号，写成echo "I am good at $skillScript"，解释器就会把$skillScript当成一个变量（其值为空），代码执行结果就不是我们期望的样子了。





已定义的变量，可以被重新定义，如：

```shell
your_name="tom"
echo $your_name
your_name="alibaba"
echo $your_name
```



##### 只读变量

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```shell
#!/bin/bash
myUrl="https://www.google.com"
readonly myUrl
# 报错
myUrl="https://www.daadong.com" 
```



##### 删除变量

使用 unset 命令可以删除变量。语法：

```shell
unset variable_name
```

变量被删除后不能再次使用。

```shell
myUrl="https://www.adong.com"
unset myUrl
echo $myUrl
```

##### 变量类型

运行shell时，会同时存在三种变量：

- **1) 局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
- **2) 环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- **3) shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

### :heavy_check_mark: Shell 字符串

##### 声明字符串

字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。

```
str='this is a string'
str="this is a string"
str=string
```



**双引号的优点**

- 双引号里可以有变量
- 双引号里可以出现转义字符

```shell
your_name="adong"
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str
```



:microscope: **区别**



```shell
your_name="adong"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```
结果
```
hello, adong ! hello, adong !
hello, adong ! hello, ${your_name} !
```



##### 获取字符串长度

`${#str}` 可获取字符串长度

```shell
str=qweqe
echo #str
```

##### 提取子字符串

```shell
string="github is a great site"
echo ${string:0:6} # 输出 github
```



##### 查找子字符串

查找字符 **i** 或 **o** 的位置(哪个字母先出现就计算哪个)：

```shell
string="github is a great site"
echo `expr index "$string" io`  # 输出 2
```



##### Shell 数组

bash支持一维数组（不支持多维数组），并且没有限定数组的大小。

类似于 C 语言，数组元素的下标由 0 开始编号。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于 0。

**定义数组**

在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：

```shell
数组名=(值1 值2 ... 值n)
```
例如：
```shell
array_name=(value0 value1 value2 value3)
```
或者
```shell
array_name=(
value0
value1
value2
value3
)
```

还可以单独定义数组的各个分量：



```shell
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```



可以不使用连续的下标，而且下标的范围没有限制。

**读取数组**

读取数组元素值的一般格式是：

```
${数组名[下标]}
```

例如：

```shell
valuen=${array_name[n]}
```

使用 **@** 符号可以获取数组中的所有元素，例如：

```shell
echo ${array_name[@]}
```

**获取数组的长度**

获取数组长度的方法与获取字符串长度的方法相同，例如：

```shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```



### :heavy_check_mark: Shell 注释



##### 单行注释

```shell
# 取得数组单个元素的长度
```



##### 多行注释



```shell
:<<EOF
注释内容...
注释内容...
注释内容...
EOF

:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!
```



