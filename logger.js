class myLog{
    static levelMap = {
        close:Number.MIN_SAFE_INTEGER,
        track:1,
        debug:10,
        info:20,
        warn:30,
        error:40,
        open:Number.MAX_SAFE_INTEGER
    };

    static levelColor = {
        track:{
            color:"white",
            bgColor:"#cc99ff"
        },
        debug:{
            color:"white",
            bgColor:"#a6a6a6"
        },
        info:{
            color:"white",
            bgColor:"#1aa3ff"
        },
        warn:{
            color:"white",
            bgColor:"#ffa366"
        },
        error:{
            color:"white",
            bgColor:"#ff6666"
        },
  
    }

    /**
     * 是一个 filter 也是一个 lib
     * {
     *  defalut:{level:xxx},
     *  web:{level:xxx},
     *  ccc:{level:xxx}
     * }
     * 
     */
    static categories = {};

    /**
     * 每次必定有默认值
     * name categoryName
     * level  filter
     */
    constructor({name,level}={name:"default",level:"close"}) {
        //实例属性
        this.categoryName = name;
        //注册为静态属性，给过滤器用
        myLog.categories[name] = {};
        myLog.categories[name].level = level || "close";
        myLog.categories[name].close = false;
    }
        /**
     * 过滤器的自定义函数，决定返回的日志数据
     * @param {*} msgLevel 消息的级别
     * @param {*} filterLevel 过滤的级别
     */
    condition = (msgLevel,filterLevel)=>true;
    
    
    /**
     * String: when condition equal msgLevel return true
     * Function: depend the function's return 
     * other: reset condition , alway return true 
     * @param {String Function null} condition 
     */
    setCondition(condition){
        if(typeof condition === 'function'){
            this.condition = condition
        }else if(typeof condition === 'string'){
            this.condition = (msgLevel,filterLevel)=>msgLevel === condition
        }else{//重置
            this.condition = (msgLevel,filterLevel)=>true;
        }
    }
    
    /**
     * 设置一众或单个category的level，以及开关close 默认设置全部
     * @param {*} param0 
     */
    setFilterCategory({name,level,close}={}){
        
        if(!name)return

        if(!Array.isArray(name)){
            name = [name]
        }
        name.forEach(categoryName=>{
             
             if(myLog.categories[categoryName]){
                myLog.categories[categoryName].level = level || "close"
                close !== undefined && (myLog.categories[categoryName].close = close)
             }
             
        })
    }
    /**
     * 关闭所有
     */
    static closeFilters(){
        myLog.categories.forEach(categoryName=>{
            myLog.categories[categoryName].close = true
        })
    }

    filtering(categoryName,msgLevel){
        //1.检查category 是否在 filter里
        let filterCategory = myLog.categories[categoryName]
        if(!filterCategory){
            return false
        }else if(myLog.levelMap[msgLevel] < myLog.levelMap[filterCategory.level]){
            return false
        }else if(filterCategory.close){
            return false
        }else if(this.condition(msgLevel,filterCategory.level)){
            return true
        }

    }
    /**
     * 打开自身，可设置level
     * @param {*} level 
     */
    openSelf(level){

        myLog.categories[this.categoryName].close = false

        level && (myLog.categories[this.categoryName].level = level)
    }
    closeSelf(){
        myLog.categories[this.categoryName].close = true

        level && (myLog.categories[this.categoryName].level = level)
    }
    /**
     * 设置其他logger实例，
     * @param {*} level 
     */
    setOthers(operate="on"){
        for (const [categoryName,category] of Object.entries(myLog.categories)) {

            if(this.categoryName !== categoryName){
                if(operate === 'on'){
                    category.close = false
                }else if(operate === 'off'){
                    category.close = true
                }
            }

            myLog.categories[categoryName] = category
        }
    }
    // 输出样式
    _logout(level="",msgs){

        const time = this.dateFormate(new Date())
        const categoryName = this.categoryName

        console.log(`%c${level.toUpperCase()} `, `color: ${myLog.levelColor[level].color}; font-style: italic; background-color:${myLog.levelColor[level].bgColor};padding: 2px`,`[${categoryName}] [ ${time} ]`,...msgs);
    }
    /**
     * replace
     * @param {*} date 
     * @param {*} pattern 
     */
    dateFormate(date,pattern="YYYY-MM-DD hh:mm:ss.ts"){
        const {
                year,
                month,
                day,
                hour,
                minutes,
                seconds,
                milliseconds,
                timestamp,
            } = this.timeMate(date)

        if(pattern){
            return pattern.replace("YYYY",year)
                            .replace("MM",month)
                            .replace("DD",day)
                            .replace("hh",hour)
                            .replace("mm",minutes)
                            .replace("ss",seconds)
                            .replace("ts",milliseconds)
        }else{
            return timestamp
        }
    }
    /**
     * 时间元信息
     * @param {*} date 
     */
    timeMate(date){

        let year = date.getFullYear()
        let month = (date.getMonth() + 1)<10 ? "0"+(date.getMonth() + 1):(date.getMonth() + 1)
        let day = date.getDate()<10 ? "0"+date.getDate() : date.getDate()
        let hour = date.getHours()<10 ? "0"+date.getHours() : date.getHours()
        let minutes = date.getMinutes()<10 ? "0"+date.getMinutes():date.getMinutes()
        let seconds = date.getSeconds()<10 ? "0"+date.getSeconds():date.getSeconds()
        let milliseconds = date.getMilliseconds()
        let timestamp = date.getTime()
    
            return {
                year,
                month,
                day,
                hour,
                minutes,
                seconds,
                milliseconds,
                timestamp,
            }
    }

    //实例方法，记录输入
    track(...msgs){

        if(this.filtering(this.categoryName,"track")){
            this._logout("track",msgs)
        }
    }
    debug(...msgs){

        if(this.filtering(this.categoryName,"debug")){
            this._logout("debug",msgs)
        }
    }
    info(...msgs){

        if(this.filtering(this.categoryName,"info")){
            this._logout("info",msgs)
        }
    }
    warn(...msgs){

        if(this.filtering(this.categoryName,"warn")){
            this._logout("warn",msgs)
        }
    }
    error(...msgs){

        if(this.filtering(this.categoryName,"error")){
            this._logout("error",msgs)
        }
    }
    
}


