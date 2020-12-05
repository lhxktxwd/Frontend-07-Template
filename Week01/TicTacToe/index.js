const run = ()=>{

    //数据
    const data = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]

    //当前是否是画圈
    let isCircle = true

    const clone =(data)=>JSON.parse(JSON.stringify(data)) 

    //处理点击事件(画圈或者画叉)
    const handleClick = (event,lineIndex,cellIndex)=>{
        const ele = event.target;
        if(!ele.innerText){
            if(isCircle){
                ele.innerText = '⭕️'
            }else{
                ele.innerText = '❌'
            }
            data[lineIndex][cellIndex] = isCircle ? 1 : 2
            isCircle = !isCircle
            if(!handleWin(data)){
                console.log(`${isCircle ?'❌': '⭕️'} is win!`)
            }else{
                if(willWin(data,isCircle)){
                    console.log(`${isCircle ?'⭕️': '❌'} will win!`)
                };
            };
            console.log(bestChoice(data,isCircle));
        }
    }

    const circleWin = (num)=>num === 1
    const divergeWin = (num)=>num === 2

    const dealList = (list)=>{
        if(list.every(circleWin)){
            return true
        }
        if(list.every(divergeWin)){
            return true
        }
        return false
    }

    //计算赢输
    const handleWin = (_data)=>{
        //计算行
        const lineWin = ()=>{
            for (let index = 0; index < _data.length; index++) {
                const list = _data[index];
                if(dealList(list)){
                    return true;
                }
            }
        }
        
        //计算列
        const cellWin = ()=>{
            for (let i = 0; i < 3; i++) {
                const list = new Array(3).fill(0);
                for (let j = 0; j < 3; j++) {
                    list[j] = _data[j][i]
                }
                if(dealList(list)){
                    return true;
                }
            }
        }

        //计算斜线
        const slash = ()=>{
            const list = new Array(3).fill(0),list2 = new Array(3).fill(0);
            //左斜线
            for (let i = 0; i < 3; i++) {
                list[i] = _data[i][i]
            }
            if(dealList(list)){
                return true;
            }
            //右斜线
            for (let j = 2; j > -1; j--) {
                list2[j] = _data[j][2-j]
            }
            if(dealList(list2)){
                return true;
            }
        }
        return !lineWin()?!cellWin()?!slash():null:null
    }

    //预知要赢
    const willWin = (_data,_isCircle)=> {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const ele = _data[i][j];
                if(ele)continue;
                const newData =  clone(_data);
                newData[i][j] = _isCircle ? 1:2;
                if(!handleWin(newData)){
                    return [j,i]
                };
            }
            
        }
    }

    //最优路线选择
    const bestChoice = (_data,_isCircle)=>{
        let p,
        result = -2,
        point = null;
        if(p = willWin(_data,_isCircle)){
            return {
                point:p,
                result:1
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(_data[i][j])continue;
                let tmp = clone(_data);
                tmp[i][j] = _isCircle ? 1:2
                // tmpDraw('tmp',tmp)
                let r = bestChoice(tmp,!_isCircle).result
                if(-r > result){
                    point = [j,i]
                    result = -r
                }
            }
        }
        return {
            point,
            result:point?result:0
        }
    }

    //画棋盘并绑定点击事件
    const drawBg = (id,data)=>{
        const root = document.getElementById(id)

        data.forEach((list,lineIndex)=>{
            list.forEach((item,cellIndex)=>{
                const div = document.createElement('div')
                div.classList = 'block'
                div.addEventListener('click',(e)=>handleClick(e,lineIndex,cellIndex))
                if(item === 1){
                    div.innerText = '⭕️'
                }else if(item === 2){
                    div.innerText = '❌'
                }
                root.appendChild(div)
            })
            root.appendChild(document.createElement('br'))
        })
        
    }

    //用于打印模拟结果
    const tmpDraw = (id,data)=>{
        const root = document.getElementById(id)

        data.forEach((list,lineIndex)=>{
            list.forEach((item,cellIndex)=>{
                const div = document.createElement('div')
                div.classList = 'tmp'
                div.addEventListener('click',(e)=>handleClick(e,lineIndex,cellIndex))
                if(item === 1){
                    div.innerText = '⭕️'
                }else if(item === 2){
                    div.innerText = '❌'
                }
                root.appendChild(div)
            })
            root.appendChild(document.createElement('br'))
        })
        const line = document.createElement('div')
        line.classList = 'line'
        root.appendChild(line)
        
    }
    

    drawBg('root',data)
}

run();