function noneRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
    // 添加头元素
    let r = $("<span></span>");
    r.addClass("label");
    r.addClass("noneLabel");
    r.html(rest);
    // 添加子元素
    if (lineList.length > 2){
        let childrenLineList = lineList.slice(1,lineList.length);
        let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
        r.append(childrenElementList);
    }
    //
    return r;
}
function sRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#s"){throw Error("输入sRender的不是d标签");}
        }
        else{throw Error("输入sRender的不是s标签");}
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
    // 创建head元素
    let r = $("<div></div>");
    r.addClass("label");
    r.addClass("sLabel");
    let s = $("<span class='sLabelSpan'></span>");
    s.html(rest);
    r.append(s);
    //  添加child元素
    let childrenLineList = lineList.slice(1,lineList.length);
    let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
    r.append(childrenElementList);
    return r;
}
function pRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#p"){throw Error("输入pRender的不是p标签");}
        }
        else{throw Error("输入pRender的不是d标签");}
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
        // before soundmark after
        let soundmarkMatch = rest.match(/[\/\[]{1}\S*[\/\]]{1}/);
        let soundmark = "";
        let soundmarkStartIndex = 0;
        let soundmarkEndIndex = 0;
        if (soundmarkMatch != null){
            soundmark = soundmarkMatch[0];
            soundmarkStartIndex = soundmarkMatch.index;
            soundmarkEndIndex = soundmarkMatch.index + soundmark.length;
        }
        let before = rest.slice(0, soundmarkStartIndex);
        let after = rest.slice(soundmarkEndIndex, rest.length);
    // 创建head元素
    let r = $("<div></div>");
    r.addClass("label");
    r.addClass("pLabel");
    let beforeSpan = $("<span></span>");
    beforeSpan.html(before);
    let soundmarkSpan = $("<span class='soundmarkSpan'></span>");
    soundmarkSpan.html(soundmark);
    let afterSpan = $("<span></span>");
    afterSpan.html(after);
    r.append([beforeSpan, soundmarkSpan, afterSpan]);
    // 添加child元素
    let childrenLineList = lineList.slice(1,lineList.length);
    let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
    r.append(childrenElementList);
    return r;
}
function mRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#m"){throw Error("输入mRender的不是m标签");}
        }
        else{throw Error("输入mRender的不是m标签");}
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
    // 创建head元素
    let r = $("<div></div>");
    r.addClass("label");
    r.addClass("mLabel");
    // 添加child元素
    let childrenLineList = lineList.slice(1,lineList.length);
    let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
    r.append(childrenElementList);
    return r;
}
function dRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#d"){throw Error("输入dRender的不是d标签");}
        }
        else{throw Error("输入dRender的不是d标签");}
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
        // pos
        let posMatch = rest.match(/[\u4E00-\u9FA5A-Za-z0-9]+./g);
        let posList = []
        if (posMatch != null){
            posList = posMatch;
        }
    // 创建head元素
    let r = $("<div></div>");
    r.addClass("label");
    r.addClass("dLabel");
    for (let i = 0; i < posList.length; i++){
        let p = $("<span></span>");
        p.addClass("posSpan");
        p.html(posList[i]);
        r.append(p);
    }
    // 添加child元素
    let childrenLineList = lineList.slice(1,lineList.length);
    let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
    r.append(childrenElementList);
    return r;
}
function eRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#e"){throw Error("输入eRender的不是e标签");}
        }
        else{throw Error("输入eRender的不是e标签");}
        //  tag
        let tagMatch = rest.match(/@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
        // reference
        let reference = rest
    // 创建head元素
    let r = $("<div></div>");
    r.addClass("label");
    r.addClass("eLabel");
    let referenceElement = $("<span></span>");
    referenceElement.addClass("reference")
    referenceElement.html(reference);
    r.append(referenceElement);
    // 添加child元素
    let childrenLineList = lineList.slice(1,lineList.length);
    let childrenElementList = renderMulti(childrenLineList, headIndent+indentSpace);
    r.append(childrenElementList);
    return r;
}
function vRender(lineList) {
    let headLine = lineList[0];
    let headIndent = headLine.match(/^ */)[0].length;
    // 解析headline
        let rest = headLine;
        // label
        let labelMatch = headLine.match(/^\s*#\S+\s*/);
        let label = "";
        if (labelMatch != null){
            label = labelMatch[0];
            rest = headLine.slice(label.length, headLine.length);
            label = label.trim();
            if (label != "#v"){throw Error("输入vRender的不是v标签");}
        }
        else{throw Error("输入vRender的不是v标签");}
        // tag
        let tagMatch = rest.match(/@@[^@]*/);
        if (tagMatch != null){
            let tagList = rest.match(/@@[^@]*/g);
            // 处理tag
            rest = rest.slice(0, tagMatch.index);
        }
        // url start end
        let url = "";
        let start = null;
        let end = null;
        {
            let hashMatch = rest.match(/(?<=(?:.mp4|.mp3))#/);
            // 无#的情况
            if (hashMatch == null){
                url = rest;
            }
            // 有#的情况
            else{
                let hashIndex = hashMatch.index;
                url = rest.slice(0, hashIndex);
                rest = rest.slice(hashIndex+1, rest.length);
                let dashMatch = rest.match(/-/);
                // 时间段的情况，例如： d/a.mp4#130-140
                if (dashMatch != null){
                    let dashIndex = dashMatch.index;
                    start = rest.slice(0, dashIndex);
                    end = rest.slice(dashIndex+1, rest.length);
                }
                // 时间点的情况，例如： d/a.mp4#130
                else{
                    start = rest;
                }
            }
        }
    // 创建head元素
    let r = $("<div style=\"text-align:left\"> \n" +
        "        <video id=\"video1\" width=\"420\" controls>\n" +
        "            <source src=\"/static/video/" + url + "\" type=\"video/mp4\">\n" +
        "            您的浏览器不支持 HTML5 video 标签。\n" +
        "        </video>\n" +
        "    </div> ");
    r.addClass("label");
    r.addClass("vLabel");
    // 时间戳控制
    {
        let loop = false;
        let autoplay = true; // 暂不支持，详见https://www.jianshu.com/p/caf9f159cf87
        let myVideo=r.children("video")[0];
        // init
        if (start != null){myVideo.currentTime = start;}
        // event
        {
            // 时间点
            if ((start != null) && (end == null)){
                myVideo.ontimeupdate = function (){
                    if(myVideo.currentTime<start){
                        myVideo.currentTime = start;
                        if (!loop){myVideo.pause();}
                    }
                }
            }
            // 时间段
            else if((start != null) && (end != null)){
                myVideo.ontimeupdate = function (){
                    if(myVideo.currentTime>end || myVideo.currentTime<start){
                        myVideo.currentTime = start;
                        if (!loop){myVideo.pause();}
                    }
                }
            }
        }

    }

    // 添加child元素
    if (lineList.length > 1){
        throw Error("v标签不应该有孩子");
    }
    return r;
}