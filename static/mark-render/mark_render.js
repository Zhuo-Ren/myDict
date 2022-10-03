var indentSpace = 2;

/**
 * 把标记文本渲染成html元素.
 *
 * @example
 *   a = "  #s aaaa\n    #p bbbb\n     #p cccc"
 *   r = render(a)
 *   r // <div>aaaa<span>bbbb</span><span>bbbb</span></div>
 * @example
 *   a = "
        #s apple
        #p [appl:e](名词)@@A
        #p /apple:3/(动词)@@B
        #p /app:/(失爆)
        #m
          #d n.v.
            苹果。 #zh
            A kind of fruit.  #en
          #e CET4
            #t I like apple. #en
            #t 我喜欢苹果。 #zh
            #v E://a.mp4#2:20-2:23 #en
            #v E://b.mp4#130-133 #zh
     r = render(a)
 "
 * @param {string} markText 标记文本.
 * @return {HTMLElement} 标记文本渲染成的html元素
 */
function markRender(markText) {
     // 类型检测
    if (typeof(markText) != 'string'){
        throw TypeError('参数markText的类型必须是string')
    }
    // 规范换行符
    markText = markText.replace(/\n\r|\r\n|\r/g, "\n");
    // 分行
    let lineList = markText.split("\n");
    //
    let htmlElementList = renderMulti(lineList,0);
    //
    return htmlElementList;
}

/**
 * 把标记文本（以标签行列表形式给出）渲染成html元素.
 *  标记文本的最好层级包含一到多个兄弟标签。
 *
 *  * @example
 *   a = "  #s aaaa\n    #p bbbb\n     #p cccc  #s dddd\n    #p eeee\n     #p ffff"
 *   r = render(a)
 *   r // <div>aaaa<span>bbbb</span><span>cccc</span></div><div>dddd<span>eeee</span><span>ffff</span></div>
 * @param {string} markText 标记文本.
 * @return {HTMLElement} 标记文本渲染成的html元素
 */
function renderMulti(lineList, indent) {
    let htmlElementList = [];
    // 分组并依次渲染
    let curGroup = [];
    for(let curIndex = 0; curIndex < lineList.length; curIndex++){
        let curLine = lineList[curIndex];
        let curIndent = curLine.match(/^ */)[0].length;
        if (curIndent == indent){
            // 结束上一个group
            if (curGroup.length != 0){
                htmlElementList.push(renderOne(curGroup));
            }
            // 开始下一个group
            curGroup = [];
            curGroup.push(curLine);
        }
        else if (curIndent > indent){
            // 当前line加入当前group
            curGroup.push(curLine);
        }
        else{
            throw Error("缩进错误");
        }
    }
    if (curGroup.length > 0){
        htmlElementList.push(renderOne(curGroup));
    }
    return htmlElementList;
}
/**
 * 把标记文本（以标签行列表形式给出）渲染成html元素。
 * 标记文本的最高级只有一个标签。
 *
 * @example
 *   a = [
 *       "  #s aaaa",
 *       "    #p bbbb",
 *       "    #p cccc"
 *   ]
 *   r = render(a)
 *   r // <div>aaaa<span>bbbb</span><span>bbbb</span></div>
 * @param {Array} lineList 一个标签内的所有行组成的数组。
 * 注意lineList必须对应一个标签，即所有行的缩进都不能超过
 * 第一行的缩进。
 * @return {HTMLElement} 标记文本渲染成的html元素
 */
function renderOne(lineList){
    //
    if (lineList.length == 0){
        throw Error('参数lineList的长度不能为0')
    }
    //
    let headLine = lineList[0];


    let label = "";
    let t = headLine.match(/(?<= *)#[^\s]*/);
    if (t != null){
        label = t[0];
    }
    switch(label){
        case "":{return noneRender(lineList);break;}
        case "#s":{return sRender(lineList);break;}
        case "#p":{return pRender(lineList);break;}
        case "#m":{return mRender(lineList);break;}
        case "#d":{return dRender(lineList);break;}
        case "#e":{return eRender(lineList);break;}
        case "#v":{return vRender(lineList);break;}
        case "#a":{return aRender(lineList);break;}
        case "#t":{return tRender(lineList);break;}
        case "#r":{return rRender(lineList);break;}
        case "#l":{return lRender(lineList);break;}
        default: {return noneRender(lineList);break;}
    }
}
