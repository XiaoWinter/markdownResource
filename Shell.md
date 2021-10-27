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

# 不太行
:<<'
注释内容...
注释内容...
注释内容...
'

# 不太行
:<<!
注释内容...
注释内容...
注释内容...
!
```



### :heavy_check_mark: Shell传递参



##### 获取参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：**$n**。**n** 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……



##### 内部参数

以下实例我们向脚本传递三个参数，并分别输出，其中 **$0** 为**执行的文件名**（包含文件路径）：

另外，还有几个特殊字符用来处理参数：

| 参数处理 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本传递的参数。<br/>如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $@       | 与$*相同，但是使用时加引号，并在引号中返回每个参数。<br/>如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $-       | 显示Shell使用的当前选项，与[set命令](https://www.runoob.com/linux/linux-comm-set.html)功能相同。 |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |
|          |                                                              |
|          |                                                              |

$* 与 $@ 区别：

- 相同点：都是引用所有参数。
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

```shell
echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done
```



### :heavy_check_mark: Shell 基本运算符

Shell 和其他编程语言一样，支持多种运算符，包括：



- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

##### expr

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 **awk** 和 **expr**，**expr 最常用**。

**expr 是一款表达式计算工具**，**使用它能完成表达式的求值操作**。

```shell
val=`expr 2 + 2`
echo "两数之和为 : $val"
```



两点注意：

- 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
- 完整的表达式要被 **` `** 包含，注意这个字符不是常用的单引号，在 Esc 键下边。

##### 算术运算符

下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：



| 运算符 | 说明                                       | 举例                  |
| ------ | ------------------------------------------ | --------------------- |
| +      | 加法                                       | value=`expr $a + $b`  |
| -      | 减法                                       | value=`expr $a - $b`  |
| *      | 乘法                                       | value=`expr $a \* $b` |
| /      | 除法                                       | value=`expr $a / $b`  |
| %      | 取余                                       | value=`expr $a % $b`  |
| =      | 赋值                                       | a=$b                  |
| ==     | 相等，用于比较两个数字，相等则返回true     | value=`expr $a == $b` |
| !=     | 不相等，用于比较两个数字，不相等则返回true | value=`expr $a != $b` |
|        |                                            |                       |



```shell
a=301
b=30
echo `expr $a + $b`
echo `expr $a - $b`
echo `expr $a \* $b`
echo `expr $a / $b`
echo `expr $a % $b`
echo `expr $a == $b`
echo `expr $a != $b`

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

:warning: 注意

- 乘号(*)前边必须加反斜杠(\)才能实现乘法运算；
- if...then...fi 是条件语句，后续将会讲解。
- 在 MAC 中 shell 的 expr 语法是：**$((表达式))**，此处表达式中的 "*" 不需要转义符号 "\" 。



##### 关系运算符



关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                                | 举例                     |
| ------ | --------------------------------------------------- | ------------------------ |
| -eq    | 检测两个数是否相等，相等返回true                    | [ $a -eq $b ] 返回 false |
| -ne    | 检测两个数是否不相等，不相等返回 true               | [ $a -ne $b ] 返回 true  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true     | [ $a -gt $b ] 返回 false |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true     | [ $a -lt $b ] 返回 true  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true | [ $a -ge $b ] 返回 false |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true | [ $a -le $b ] 返回 true  |
|        |                                                     |                          |

```shell
if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi
```

##### 布尔运算符



下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                              | 举例                                   |
| ------ | ------------------------------------------------- | -------------------------------------- |
| ！     | 非运算，表达式为 true 则返回 false，否则返回 true | [ ! false ] 返回 true                  |
| -o     | 或运算，有一个表达式为 true 则返回 true           | [ $a -lt 20 -o $b -gt 100 ] 返回 true  |
| -a     | 与运算，两个表达式都为 true 才返回 true           | [ $a -lt 20 -a $b -gt 100 ] 返回 false |



```shell
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi
```

##### 逻辑运算符

以下介绍 Shell 的逻辑运算符，假定变量 a 为 10，变量 b 为 20:

| 运算符 | 说明       | 举例                                      |
| ------ | ---------- | ----------------------------------------- |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\|$b -gt 100 ]] 返回 true |

```shell
if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

if [[ $a -lt 100 || $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi
```

##### 字符串运算符

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

| 运算符 | 说明                                        | 举例                     |
| ------ | ------------------------------------------- | ------------------------ |
| =      | 检测两个字符串是否相等，相等返回 true。     | [ $a = $b ] 返回 false   |
| !=     | 检测两个字符串是否不相等，不相等返回 true。 | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串长度是否为0，为0返回 true。       | [ -z $a ] 返回 false。   |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 true  | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否为空，不为空返回 true。       | [ $a ] 返回 true。       |

```shell
a="abc"
b="efg"

if [ $a = $b ]
then
   echo "$a = $b : a 等于 b"
else
   echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]
then
   echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi

```

##### 文件测试运算符

文件测试运算符用于检测 Unix 文件的各种属性。

属性检测描述如下：



| 操作符  | 说明                                                         | 举例                      |
| ------- | ------------------------------------------------------------ | ------------------------- |
| -b file | 检测文件是否是块设备文件 :confused:，如果是，则返回 true。   | [ -b $file ] 返回 false。 |
| -c file | 检测文件是否是字符设备文件 :confused:，如果是，则返回 true。 | [ -c $file ] 返回 false   |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file | 检测文件是否设置了 SGID 位:confused:，如果是，则返回 true。  | [ -g $file ] 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false。 |
| -p file | 检测文件是否是有名管道，如果是，则返回 true。                | [ -p $file ] 返回 false。 |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false。 |
| -r file | 检测文件是否可读，如果是，则返回 true。                      | [ -r $file ] 返回 true。  |
| -w file | 检测文件是否可写，如果是，则返回 true                        | [ -w $file ] 返回 true    |
| -x file | 检测文件是否可执行，如果是，则返回 true                      | [ -x $file ] 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true       | [ -s $file ] 返回 true    |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true            | [ -e $file ] 返回 true    |
|         |                                                              |                           |



```shell
if [ -r $file ]
then
   echo "文件可读"
else
   echo "文件不可读"
fi
if [ -w $file ]
then
   echo "文件可写"
else
   echo "文件不可写"
fi
if [ -x $file ]
then
   echo "文件可执行"
else
   echo "文件不可执行"
fi
if [ -f $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
if [ -d $file ]
then
   echo "文件是个目录"
else
   echo "文件不是个目录"
fi
if [ -s $file ]
then
   echo "文件不为空"
else
   echo "文件为空"
fi
if [ -e $file ]
then
   echo "文件存在"
else
   echo "文件不存在"
fi
```

## :heavy_check_mark: Shell echo命令

##### 显示普通字符串



```shell
echo "123x"
# 双引号可省略
echo 123x
```



##### 显示转义字符

```shell
echo "\"It is a test\""
```



##### 显示变量

read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量

```shell
read name 
echo "$name It is a test"
```

结果

```shell
[root@www ~]# sh test.sh
OK                     #标准输入
OK It is a test        #输出
```



##### 显示换行

```shell
echo -e "OK! \n" # -e 开启转义
echo "It is a test"
```



##### 显示不换行

```shell
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
```



##### 显示结果定向至文件

```shell
echo "It is a test" > myfile
```



##### 原样输出字符串，不进行转义或取变量（用单引号）

```shell
echo '$name\"'
```



##### 显示命令执行结果

```shell
echo `date`
```

### :heavy_check_mark: Shell printf 命令



### :heavy_check_mark: Shell test 命令



### :heavy_check_mark: Shell 流程控制



### :heavy_check_mark: Shell 函数



### :heavy_check_mark: Shell 输入/输出重定向



### :heavy_check_mark: Shell 文件包含



