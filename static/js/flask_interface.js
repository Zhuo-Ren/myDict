/**
 * flask interface. Search a entry.
 * URL：/searchEntry
 * 是否异步：否
 * 传出数据：
 *
 * 传回数据：
 *
 * @param {string} spelling  Spelling of the entry.
 * @return [data, status] The return data.
 */
function searchEntry(spelling){
    // 返回值
    let r = undefined;
    // 禁用鼠标（因为是非异步请求）
    $("body").css("pointer-events", "none");
    $.post(
        "/searchentry",
        {
            spelling: spelling
        },
        function (data, status) {
            // 解禁鼠标
            $("body").css("pointer-events", "auto");
            //
            r = data;
        }
    );
    return r;
}


/**
 * flask interface. Save a entry.
 * URL：/saveEntry
 * 是否异步：否
 * 传出数据：
 *
 * 传回数据：
 *
 * @param {string} spelling  Spelling of the entry.
 * @param {string} myDictText  修改后的标记文本。
 * @return [data, status] The return data.
 */
function saveEntry(spelling, myDictText){
    // 返回值
    let r = undefined;
    // 禁用鼠标（因为是非异步请求）
    $("body").css("pointer-events", "none");
    $.post(
        "/saveentry",
        {
            spelling: spelling,
            myDictText: myDictText
        },
        function (data, status) {
            // 解禁鼠标
            $("body").css("pointer-events", "auto");
            //
            r = data;
        }
    );
    return r;
}


function saveScore(reviewId, reviewScore){
    // 返回值
    let r = undefined;
    // 禁用鼠标（因为是非异步请求）
    $("body").css("pointer-events", "none");
    $.post(
        "/savescore",
        {
            reviewId: reviewId,
            reviewScore: reviewScore
        },
        function (data, status) {
            // 解禁鼠标
            $("body").css("pointer-events", "auto");
            //
            r = data;
        }
    );
    return r;
}