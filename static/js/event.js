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
                $("#showDiv").append(markRender(r["MyDict"]));
                // oxford9页
                $("#oxford9Window").html(r["Oxford9"]);
                // oxford9Rest页
                $("#oxford9RestWindow").html(r["Oxford9Rest"]);
            }
            // 保存标记文本
            let showDiv = $("#showDiv");
            showDiv.attr("markText", r["MyDict"]);
            // myDict的编辑按钮
            let editButton = $("<button>编辑</button>");
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

        }
}


// nextButton: 单击
function nextButtonClick(){
    //let reviewList = $("#reviewWindow").attr("reviewList");
    //let reviewIndex = $("#reviewWindow").attr("reviewIndex");
    if (reviewIndex + 1 == reviewList.length){
        alert("复习结束，请关闭页面");
    }
    else{
        // 结束上一个
        if (reviewIndex >= 0){
            // 取消上一题的display strategy
            unloadCssFile("/static/displayStrategy/"+curReview["displayStrategy"]+".css");
            // 重置上一题的评分按钮
            $("#aButton").css("background-color", "#e8e8e8");
            $("#bButton").css("background-color", "#e8e8e8");
            $("#cButton").css("background-color", "#e8e8e8");
            // 上传得分
            let score = 5;
            saveScore(curReview["id"], score);
        }
        // 开始下一个
        {
            reviewIndex = reviewIndex + 1;
            curReview = reviewList[reviewIndex];
            // 加载下一题
            $("#searchInput").val(curReview["spelling"]);
            $("#searchButton").click();
            // 应用下一题的display strategy
            loadCssFile("/static/displayStrategy/"+curReview["displayStrategy"]+".css");
        }

    }
}

// answerButton: 单击
function answerButtonClick(){
    unloadCssFile("/static/displayStrategy/"+curReview["displayStrategy"]+".css");
}

// aButton: 单击
function aButtonClick(){
    $("#aButton").css("background-color", "gray");
    $("#bButton").css("background-color", "#e8e8e8");
    $("#cButton").css("background-color", "#e8e8e8");
}
// bButton: 单击
function bButtonClick(){
    $("#aButton").css("background-color", "#e8e8e8");
    $("#bButton").css("background-color", "gray");
    $("#cButton").css("background-color", "#e8e8e8");
}
// cButton: 单击
function cButtonClick(){
    $("#aButton").css("background-color", "#e8e8e8");
    $("#bButton").css("background-color", "#e8e8e8");
    $("#cButton").css("background-color", "gray");
}