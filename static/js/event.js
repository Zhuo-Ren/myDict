// searchButton: 单击
function searchButtonClick(){
    // 当前词
    let spelling = $("#searchInput").val();
    // 请求当前词的释义
    let r = searchEntry(spelling);
    // 根据返回进行展示
        // 如果没有搜到当前词的释义
        if (r == "failed"){
            // 显示没找到
            $("#centerWindow").html("没有搜索到。");
            // 添加词性按钮
            let addEnrtyButton = $("<button id='addEnrtyButton'>添加词项</button>");
            $("#centerWindow").append(addEnrtyButton);
            addEnrtyButton.click(function () {
                let  r = addEntry(spelling);
                if(r == "success"){$("#searchButton").click();}
            });
        }
        // 如果搜到了当前词的释义
        else{
            // 在centerWindow中创建空tab页。
            $("#centerWindow").html(
                "        <div id=\"spellingWindow\">\n" +
                "        </div>\n" +
                "        <div id=\"tabWindow\">\n" +
                "            <ul>\n" +
                "                <li><a href=\"#myDictWindow\">myDict</a></li>\n" +
                "                <li><a href=\"#oxford9Window\">oxford9</a></li>\n" +
                "                <li><a href=\"#oxford9RestWindow\">oxford9Rest</a></li>\n " +
                "            </ul>\n" +
                "            <div class=\"ui-layout-content\">\n" +
                "                <div id=\"myDictWindow\" class=\"textTab\">\n" +
                "                    <div id='showDiv'></div>" +
                "                </div>\n" +
                "                <div id=\"oxford9Window\" class=\"textTab\">\n" +
                "                </div>\n" +
                "                <div id=\"oxford9RestWindow\" class=\"textTab\">\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>");
            // 渲染标签页样式
            $( "#tabWindow" ).tabs();
            // 把释义添加到各tab页
            {
                // myDict页
                if (r["MyDict"]!=null){$("#showDiv").append(markRender(r["MyDict"]));}
                // oxford9页
                if (r["Oxford9"]!=null){$("#oxford9Window").html(r["Oxford9"]);}
                // oxford9Rest页
                if (r["Oxford9Rest"]!=null){$("#oxford9RestWindow").html(r["Oxford9Rest"]);}
            }
            // 保存标记文本
            let showDiv = $("#showDiv");
            showDiv.attr("markText", r["MyDict"]);
            // 换行
            let br = $("<br/>");
            showDiv.prepend(br);
            // myDict的编辑按钮
            let editButton = $("<button>编辑</button>");
            editButton.css("float", "right");
            showDiv.prepend(editButton);
            editButton.click(function(){
                // 创建editDiv
                let editDiv = $("<div></div>");
                $("#myDictWindow").append(editDiv);
                // 创建editArea
                let editArea = $("<textarea cols='90' rows='60'></textarea>");
                editArea.html(showDiv.attr("markText"));
                editDiv.append(editArea);
                // 创建cancelButton
                let cancelButton = $("<button>取消</button>");
                cancelButton.click(function(){
                    editDiv.remove();
                    showDiv.css("display","block");
                });
                editDiv.prepend(cancelButton);
                // 创建saveButton
                let saveButton = $("<button>保存</button>");
                saveButton.click(function(){
                    let r = saveEntry($("#searchInput").val(), editArea.val());
                    if (r != "success"){
                        throw Error(r);
                    }
                    $("#searchButton").click();
                });
                editDiv.prepend(saveButton);
                // 隐藏展示区
                showDiv.css("display","none");
            });
            // myDict的下拉菜单
            let displayStrategySelection = $("<select id='displayStrategySelection'>\n" +
                "\n" +
                "  <option value ='all' selected='selected'>all</option>\n" +
                "\n" +
                "  <option value ='listening'>listening</option>\n" +
                "\n" +
                "  <option value='spelling'>spelling</option>\n" +
                "\n" +
                "</select>");
            displayStrategySelection.css("width", "300px");
            showDiv.prepend(displayStrategySelection);
            // myDict的添加复习按钮
            let addReviewButton = $("<button id='addReviewButton'>添加复习</button>");
            showDiv.prepend(addReviewButton);
            addReviewButton.click(function(){
                let r = addReview(spelling, $("#displayStrategySelection").val())
                if (r != "success"){
                        throw Error(r);
                }
            });
        }
}

// nextButton: 单击
function nextButtonClick(){
    //
    if (reviewList.length == 0){
        alert("无需复习，请关闭页面");
        return;
    }
    // 结束上一个
    if (reviewIndex >= 0){
        // 上传上一题的得分
        let score = null;
        let scoreRadio = $("#scoreRadio")[0];
        for (let i = 0; i < scoreRadio.length; i++){
            if (scoreRadio[i].checked){
                score = scoreRadio[i].value;
            }
        }
        if (score == null){
            alert("请先选择记忆评分");
            return;
        }
        else{
            saveScore(Number(score));
        }
        // 取消上一题的display strategy
        unloadCssFile("/static/displayStrategy/"+curReview["display_strategy"]+".css");
        // 重置上一题的评分按钮
        $("#aButton")[0].checked = false;
        $("#bButton")[0].checked = false;
        $("#cButton")[0].checked = false;
        saveScore(curReview["id"], score);
        // 是否结束
        if (reviewIndex + 1 == reviewList.length){
        alert("复习结束，请关闭页面");
    }
    }
    // 开始下一个
    {
        reviewIndex = reviewIndex + 1;
        curReview = reviewList[reviewIndex];
        // 加载下一题
        $("#searchInput").val(curReview["spelling"]);
        $("#searchButton").click();
        // 应用下一题的display strategy
        loadCssFile("/static/displayStrategy/"+curReview["display_strategy"]+".css");
        // 选中下一题的display strategy
        $("#displayStrategySelection").val(curReview["display_strategy"])
        $("#displayStrategySelection").attr("disabled", "disabled");
    }

}

// answerButton: 单击
function answerButtonClick(){
    unloadCssFile("/static/displayStrategy/"+curReview["display_strategy"]+".css");
}
