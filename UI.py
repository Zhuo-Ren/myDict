from flask import Flask, render_template, request, jsonify
from typing import Dict, List, Tuple, Union  # for type hinting
import datetime as datetime
from storage_sqlite import StorageSqlite as Storage
from config import config

def ui():
    """
    打开软件GUI。
    """
    # Storage初始化
    Storage.open(pth=config["db_path"])

    # Flask初始化
    app = Flask(__name__)
    from datetime import timedelta
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

    @app.route('/view/', methods=["GET"])
    def view():
        return render_template("main.html", args={"pattern": "view"})

    @app.route('/review/', methods=["GET"])
    def review():
        review_list = [
            {"id": 1, "spelling": "abase", "displayStrategy": "listening"},
            {"id": 9, "spelling": "abandon", "displayStrategy": "all"},
        ];
        return render_template("main.html", args={"pattern": "review", "reviewList": review_list})

    @app.route('/searchentry', methods=["POST"])
    def searchentry():
        # 参数解析
        spelling = request.form.get("spelling")

        # 查询entry
        entry = Storage.get_entry(spelling)

        # 如果找到entry
        if entry != {}:
            return jsonify(entry)
        # 如果没找到entry
        else:
            return jsonify("failed")

    @app.route('/saveentry', methods=["POST"])
    def saveentry():
        # 参数解析
        spelling = request.form.get("spelling")
        my_dict_text = request.form.get("myDictText")

        # 查询entry
        r = Storage.update_entry(spelling, {"MyDict": my_dict_text});

        # 如果找到entry
        if r == True:
            return jsonify("success")
        # 如果没找到entry
        else:
            return jsonify(r)

    @app.route('/savescore', methods=["POST"])
    def savescore():
        # 参数解析
        review_id = request.form.get("reviewId")
        review_score = request.form.get("reviewScore")

        # xxx
        r = True

        # 如果保存成功
        if r == True:
            return jsonify("success")
        # 如果没找到entry
        else:
            return jsonify(r)



    #
    # @app.route('/viewwww/', methods=["POST"])
    # def viewwww():
    #     """
    #     展示entry页面。
    #
    #     :return:
    #     """
    #     # 参数解析
    #     spelling = request.args.get("spelling")
    #     display_strategy = request.args.get("display_strategy")
    #
    #     # 查询entry
    #     entry = Storage.get_entry(spelling)
    #
    #     # 如果找到entry
    #     if entry != {}:
    #         html = entry_dict[entry]['html']
    #         raw = entry_dict[entry]['html_raw']
    #         if entry in memorize_dict:
    #             memo_obj_list = memorize_dict[entry]
    #         else:
    #             memo_obj_list = []
    #         return render_template("main.html",
    #                                entry=spelling,
    #                                raw=html,
    #                                html=html,
    #                                memoObjList=memo_obj_list,
    #                                showType="view")
    #     # 如果没找到entry
    #     else:
    #         return render_template("main.html",
    #                                entry=spelling,
    #                                raw=html,
    #                                html=html,
    #                                memoObjList=memo_obj_list,
    #                                showType="view")
    #
    #
    #
    #
    # @app.route('/re/', methods=["GET"])
    # def re():
    #     """
    #     In the 'review' page, user can review entries. This function update the
    #     memorize_dict and calc a entry list that should be reviewed. A small group of
    #     entries, which are to be reviewed in current round, are selected from this list
    #     in random way. This group of entry are returned to frontend.
    #
    #     :return: A rendered 'review' page, with a info dict about the entry to be
    #     reviewed in current round.
    #     """
    #     entry = request.args.get("q")
    #     html = entry_dict[entry]['html']
    #     raw = entry_dict[entry]['html_raw']
    #     if entry in memorize_dict:
    #         memo_obj_list = memorize_dict[entry]
    #     else:
    #         memo_obj_list = []
    #     return render_template("main.html",
    #                            entry=entry,
    #                            raw=html,
    #                            html=html,
    #                            memoObjList=memo_obj_list)
    #
    # @app.route('/edithtml', methods=["POST"])
    # def edit_html():
    #     """
    #     In 'view' page, user can edit entry by edit the html. This function deal with
    #     the "entry html changing" require by save the changed entry into pkl file.
    #
    #     :return:
    #     """
    #     # save the new html_raw
    #     entry = request.form.get("entry")
    #     entry_dict[entry]['html_raw'] = request.form.get("raw")
    #     entry_dict[entry]['html'] = raw_to_html(entry, entry_dict[entry]['html_raw'])
    #     # save into pkl file
    #     with open(entry_dict_path, 'wb') as pkl_file:
    #         cPickle.dump(entry_dict, pkl_file)
    #     # update the website
    #     return jsonify(True)
    #
    # @app.route('/reviewscore', methods=["POST"])
    # def reviewscore():
    #     """
    #     In 'review' page, after user reviewed a entry, user scores his learning progress.
    #     This function deal with the 'earning progress scoring' operation.
    #     :return:
    #     """
    #     now = datetime.datetime.now()
    #     entry = request.form.get("entry")
    #     score = request.form.get("score")
    #     score = int(score)
    #     if not (0 < score < 100):
    #         raise RuntimeError("score的值不对")
    #     entry_dict[entry]['test_log'].append([now, score])
    #     # save into pkl file
    #     with open(entry_dict_path, 'wb') as pkl_file:
    #         cPickle.dump(entry_dict, pkl_file)
    #     # update the website
    #     return jsonify(True)

    print("http://127.0.0.1:5001/view/")
    print("http://127.0.0.1:5001/review/")
    app.run(debug=True, port=5001)

ui()