//[ \t] 匹配空格和制表符(tab)
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

const dictionary = ['Number','Whitespace','LineTerminator','*','/','+','-'];

function* tokenize(source) {
    let result = null ;
    let lasfIndex = 0;
    while (true) {
        //下次匹配开始的位置
        lasfIndex = regexp.lastIndex;
        result = regexp.exec(source);

        if(!result)break;

        //正常匹配到的话前一个index与后一个index相差一，如果为匹配到元素会返回0，与前一个index相差甚多
        if(regexp.lastIndex - lasfIndex > result[0].length)
            break;
        let token = {
            type:null,
            value:null
        }
        for (let index = 1; index < dictionary.length; index++) {
            if(result[index]) {
                token.type = dictionary[index-1];
            }
        }
        token.value = result[0];
        yield token;
    }
    yield {
        type:'EOF'
    }
}

let source = [];

for (const token of tokenize("1024 + 2 / 1")) {
    if(token.type !== 'Whitespace' && token.value !== 'LineTermintor')
    source.push(token)
}

function Expression(source){
    //['Add...','EOF']
    if(source[0].type === 'AdditiveExpression' &&  source[1] && source[1].type === 'EOF'){
        let node = {
            type:'Expression',
            children:[source.shift(),source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source)
    return Expression(source)
}

function AdditiveExpression(source){
    const temp = source[0];
    const temp2 = source[1];
    // [mul,'+/-','1']
    if(temp.type === 'MultiplicativeExpression'){
        let node = {
            type:'AdditiveExpression',
            children:[temp]
        }
        source[0] = node;
        return AdditiveExpression(source);
    }

     //['Add...','+/-','1','']
    if(temp.type === 'AdditiveExpression' && temp2 && (temp2.value === '+' || temp2.value === '-')){
        let node = {
            type:'AdditiveExpression',
            operator:temp2.value,
            children:[]
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        //['1','*/+-?']
        MultiplicativeExpression(source)
        node.children.push(source.shift())
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(temp.type === 'AdditiveExpression')
        return source;
        MultiplicativeExpression(source);
        return AdditiveExpression(source);
}

function MultiplicativeExpression(source){
    const temp = source[0];
    const temp2 = source[1];
    if(temp.type === 'Number'){
        let node = {
            type:'MultiplicativeExpression',
            children:[temp]
        };
        source[0] = node;
        return MultiplicativeExpression(source)
    }
    if(temp.type === 'MultiplicativeExpression' && temp2 && (temp2.value === '*' || temp2.value === '/')){
        let node = {
            type:'MultiplicativeExpression',
            operator:temp2.value,
            children:[]
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node)
        return MultiplicativeExpression(source)
    }
    if(temp.type === 'MultiplicativeExpression')
        return source
}

// console.log(AdditiveExpression(source));
console.log(Expression(source));
