from flask import Flask, render_template, request, jsonify
from typing import Dict, List, Tuple, Union  # for type hinting
import datetime as datetime
from storage_sqlite import StorageSqlite as Storage
from config import config
from memo_manage import MemoGroup
from sm2 import SM2
import pickle
import os

SM2.Time = True
SM2.REPEAT = True
SM2.LOG = True

review_data_path = "dict/review.pkl"

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

    @app.route('/review/', methods=["GET"])
    def review():
        if os.path.exists(review_data_path):
            f = open(review_data_path, 'rb')
            memo_group = pickle.load(f)
            f.close()
        else:
            memo_group = MemoGroup()
        on_test_keys = memo_group.get_on_test_keys()
        review_list = [memo_group[k].item_info for k in on_test_keys]
        return render_template("main.html", args={"pattern": "review", "reviewList": review_list})

    @app.route('/addreview', methods=["POST"])
    def addreview():
        try:
            # 参数解析
            spelling = request.form.get("spelling")
            display_strategy = request.form.get("displayStrategy")
            #
            if os.path.exists(review_data_path):
                f = open(review_data_path, 'rb')
                memo_group = pickle.load(f)
                f.close()
            else:
                memo_group = MemoGroup()
            #
            id = spelling + "-" + datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S-%f")
            new_sm2_obj = SM2({"id": id, "spelling":spelling, "display_strategy":display_strategy})
            memo_group.add(new_sm2_obj)
            #
            f = open(review_data_path, 'wb')
            pickle.dump(memo_group, f, -1)
            f.close()
        except Exception as e:
            return jsonify(str(e))
        else:
            return jsonify("success")

    @app.route('/savescore', methods=["POST"])
    def savescore():
        try:
            # 参数解析
            review_id = request.form.get("reviewId")
            review_score = request.form.get("reviewScore")

            # 读取记忆库
            if os.path.exists(review_data_path):
                f = open(review_data_path, 'rb')
                memo_group = pickle.load(f)
                f.close()
            else:
                memo_group = MemoGroup()
            # 检索记忆库
            if review_id not in memo_group:
                return jsonify("不存在的记忆项。")
            else:
                cur_item = memo_group[review_id]
                cur_item.review(float(review_score))
            # 保存记忆库
            f = open(review_data_path, 'wb')
            pickle.dump(memo_group, f, -1)
            f.close()
        except Exception as e:
            pass
        else:
            return jsonify("success")

    @app.route('/addentry', methods=["POST"])
    def addentry():
        try:
            # 参数解析
            spelling = request.form.get("spelling")
            #
            Storage.create_entry(spelling, {})
        except Exception as e:
            pass
        else:
            return jsonify("success")

    print("http://127.0.0.1:5001/view/")
    print("http://127.0.0.1:5001/review/")
    app.run(debug=True, port=5001)

ui()