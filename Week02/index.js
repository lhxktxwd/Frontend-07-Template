
const map = localStorage['map']? JSON.parse(localStorage['map']): Array(10000).fill(0)
const root = document.querySelector('#root')

let mousedown = false;

root.addEventListener('click',()=>{mousedown = !mousedown})

map.forEach((item,index)=>{
    const activeClass = 'normal active';
    const normalClass = 'normal'
    const el = document.createElement('div')
    el.classList = item  ? activeClass: normalClass
    el.addEventListener('mousemove',()=>{
        if(mousedown){
            el.classList.add('active')
            map[index] = 1;
        }
    })
    root.appendChild(el);
})

const sleep = (timeout)=>new Promise((resolve)=>{
    setTimeout(resolve, timeout);
})

class Sorted {
    constructor(data,compare){
        this.data = data;
        this.compare = compare || ((a,b) => a-b)
    }
    //选出最小值
    take(){
        if(!this.data.length)return
        let min = this.data[0],minIndex;
        for (let index = 0; index < this.data.length; index++) {
            if(this.compare(this.data[index],min) < 0 ){
                min = this.data[index]
                minIndex = index;
            }
        }
        this.data[minIndex] = this.data[this.data.length-1]
        this.data.pop()
        return min
    }
    give(v){
        this.data.push(v)
    }
    get length(){
        return this.data.length
    }
}


const findPath = async(map,start,end)=>{
    //两点之间直线最短，为最佳路径
    const distance = (point)=>(point[0] -end[0])**2 + (point[1]-end[1])**2
    //搜索队列(queue)，从(start)起点开始找起
    const queue = new Sorted([start],(a,b)=> distance(a) - distance(b))
    //复制一份地图数据
    const table = Object.create(map)

    

    //加入到搜索队列中
    const insert = async(x,y,pre)=>{
        //如果x和y超出地图边界则不加入到搜索队列中
        if(x<0 || x>=100 || y<0 || y>=100) return

        //如果改点被搜索过了则为true，则不进行搜索
        if(table[y*100+x]) return

        //将搜索过的点标记起来，防止重复搜索,在该位点标记上他的来源位置(pre)
        table[y*100+x] = pre
        // await sleep(30)
        root.children[y*100+x].style.backgroundColor = 'lightgreen'
        //加入到搜索队列中
        console.log([x,y]);
        queue.give([x,y])
    }
    while(queue.length){
        //取出数组中的第一个值
        let [x,y]= queue.take()
        // console.log(x,y);
        //找到了终点，结束搜索
        if(x === end[0] && y === end[1]){
            const path = [];
            while(x!== start[0] || y!==start[1]){
                path.push(map[y*100+x])
                //浏览器里运行无法给x,y赋值具体原因不详
                // [x,y] = table[y*100+x]
                // console.log(table[y*100+x]);
                const v = table[y*100+x];
                x = v[0]
                y = v[1]
                await sleep(30)
                root.children[y*100+x].style.backgroundColor = 'purple'
            }
            return path
        }
        //把目标点位的上下左右四个点位加入到搜索队列上
        await insert(x,y-1,[x,y])
        await insert(x,y+1,[x,y])
        await insert(x-1,y,[x,y])
        await insert(x+1,y,[x,y])
        //加入斜边的目标点位
        await insert(x-1,y-1,[x,y])
        await insert(x+1,y+1,[x,y])
        await insert(x-1,y+1,[x,y])
        await insert(x+1,y-1,[x,y])

    }
}

