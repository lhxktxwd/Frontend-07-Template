const {reactive,effect} = (function(){
        //用于存储effect中注册的需要监听的属性
    let usedReactivities = []
    //用于存储effect中用到reactive对象属性的函数
    const callbacks = new Map();

    function effect(callback){
        usedReactivities = []
        callback();
        for(let reactivty of usedReactivities){
            const obj = reactivty[0]
            const prop = reactivty[1]
            //是否有reactive对象
            if(!callbacks.has(obj)){
                callbacks.set(obj,new Map())
            }
            //是否有reactive对象的属性
            if(!callbacks.get(obj).has(prop)){
                callbacks.get(obj).set(prop,[])
            }
            //给reactive对象需要监听的属性和函数进行关联
            callbacks.get(obj).get(prop).push(callback)
        }
        

    }

    function reactive(data){
        return new Proxy(data,{
            set(obj,prop,value){
                obj[prop] = value
                if(callbacks.get(obj) && callbacks.get(obj).get(prop)){
                    for(let callback of callbacks.get(obj).get(prop)){
                        callback();
                    }
                }
            },
            get(obj,prop){
                usedReactivities.push([obj,prop])
                return obj[prop]
            }
        })
    }
    return {reactive,effect}
})()


const obj = reactive({a:1,b:2})

effect(()=>{
    console.log(obj.a);
})

document.getElementById('input').addEventListener('input',(e)=>{
    obj.a = e.target.value
})
