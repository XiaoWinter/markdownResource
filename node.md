# node知识点

## File System

### `var fs = require('fs');`

##### 文件是否存在

```js
if(fs.existsSync(filepath)){
	//存在
}else{
	//不存在
}
```

##### 创建文件夹

```js
var path = "./a/b/c"
var callback = function(err){
	console.log(err)
}
fs.mkdir(path,{recursive:true},callback)
```

##### 读取文件夹，返回目录和文件的数组

```js
var path = "./"
//-->['a.txt',b]
var files = fs.readdirSync(path)

```

##### 获取文件信息

```js
var path = "./"
var stats = fs.statSync(path)
```

##### 删除文件

```js
var path = './a.txt'
fs.unlinkSync(path)
```

##### 删除文件夹

```js
var path = "./"
fs.rmdirSync(path)
```



##### 删除文件夹

###### node api

```js
function removeDir(dir) {
  let files = fs.readdirSync(dir)
  for(var i=0;i<files.length;i++){
    let newPath = path.join(dir,files[i]);
    let stat = fs.statSync(newPath)
    if(stat.isDirectory()){
      //如果是文件夹就递归下去
      removeDir(newPath);
    }else {
     //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
}
removeDir('a');

```

###### 系统命令

```js
const { spawn } = require('child_process');
const ls = spawn('rm', ['-rf', '/Users/mao/workspack/python-demo/test.txt']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

