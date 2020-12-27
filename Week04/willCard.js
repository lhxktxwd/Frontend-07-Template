function find (source,pattern){
    // 找出匹配模板*号数量
    let starCount = 0;
    for (let index = 0; index < pattern.length; index++) {
        if(pattern[index] === '*')
            starCount ++
    }
    if(starCount === 0){
        for (let index = 0; index < pattern.length; index++) {
            if(pattern[index] !== source[index])
                return false
        }
        return
    }
    //找出模板开头不带*字符位置，且在与原字符开头相匹配
    let patternIndex,lastIndex;
    for (patternIndex = 0;  pattern[patternIndex] != '*'; patternIndex++) {
        if(pattern[patternIndex] !== source[patternIndex])
            return false
    }
    lastIndex = patternIndex
    //遍历匹配*后面的字符串
    for (let i = 0; i < starCount -1; i++) {
        patternIndex ++;
        let subPattern = '';
        while (pattern[patternIndex] !== '*') {
            subPattern += pattern[patternIndex];
            patternIndex++;
        }
        //将素有的？替换成热议字符匹配
        const reg = new RegExp(subPattern.replace(/\?/g,'[\\s\\S]'),'g')
        reg.lastIndex = lastIndex;
        if(!reg.exec(source))
            return false
        lastIndex = reg.lastIndex
    }
    //处理最后一个*号之后的字符
    for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
        if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== '?')
            return false
    }
    return true
}