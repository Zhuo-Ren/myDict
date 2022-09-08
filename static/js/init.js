$(function(){
    // 设置ajax不要异步执行
    $.ajaxSetup({
        async : false
    });

    // add event 给元素挂载事件
    {
        // searchButton: 单击
        $("#searchButton").click(function () {
            searchButtonClick();
        });

        // nextButton: 单击
        $("#nextButton").click(function(){
            nextButtonClick();
        })

        // answerButton: 单击
        $("#answerButton").click(function () {
            answerButtonClick();
        });
    }

    // display strategy
    $(function () {
        //根据类型显示或隐藏一些部件
        if(pattern == "view"){
            loadCssFile("/static/css/view.css");
        }
        else if (pattern == "review"){
            loadCssFile("/static/css/review.css");
            //
            $("#aButton")[0].checked = false;
            $("#bButton")[0].checked = false;
            $("#cButton")[0].checked = false;
            // 保存复习信息
            $("#reviewWindow").attr("reviewList", reviewList);
            $("#reviewWindow").attr("reviewIndex", reviewIndex);
            // 开始复习
            $("#nextButton").click();
        }
    })
})
