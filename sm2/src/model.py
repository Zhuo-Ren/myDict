# -*- coding: utf-8 -*-
import json
from typing import Union
from datetime import date, timedelta, datetime


class SM2(list):
    """
    sm-2 类。
    这是一个list，每行是对一次测试的记录，列如下：

    - "step": 步骤数
    - "plan_time": 应该在何时进行此次测试
    - "real_time": 实际上是在何时进行的此次测试
    - "q": None: 此次测试的得分
    - "interval": 此次测试结束后，过多久进行下次测试。
    - "e": 此次测试结束后，基于得分计算困难度。e越高说明越简单，越低说明越难。e~(1.1-2.5)，初始2.5。注意难度不等于熟练度（熟练度是从低到高，难度是从高到低）。

    Args：
        INIT_INTERVAL (int): 初始的interval值
        INIT_E (float): 初始的E值
    """
    # static
    INIT_INTERVAL = -1
    INIT_E = 2.5
    LOG = True
    Time = True
    REPEAT = True
    REPEAT_THRESHOLD = 4

    def __init__(self, item_info, log=None):
        """
        Init a SM2 obj.

        :param item_info: content info of this memory item.
        :type item_info: dict
        :param log: test log of this memory item. （仅当基于已有纪录重新构建sm2 obj时才会用到。平时用不到）
        :type log: list
        """
        # public: item_info
        if item_info is None:
            raise TypeError
        else:
            self.item_info = item_info

        # public: is_repeating
        self.is_repeating: Union[bool, datetime] = False
        """当开启错题重复时，记录当前item是否处于错题重复状态中：是，则记录开始错题重复的时间点；否，则记录False"""

        #
        if log is None:
            self.append({
                "step": 0, "plan_time": None, "real_time": None, "q": None,
                "interval": SM2.INIT_INTERVAL, "e": SM2.INIT_E
            })
            self.append({
                "step": 1, "plan_time": None, "real_time": None, "q": None,
                "interval": None, "e": None
            })
        else:
            if not isinstance(log, list):
                raise TypeError
            else:
                self.extend(log)

    def start_review(self, start_time=None):
        # 如果已经start，则不重复start
        if self[-1]["plan_time"] != None:
            return
        #
        if start_time == None:
            self[-1]["plan_time"] = datetime.now() if SM2.Time == True else date.today()
        else:
            self[-1]["plan_time"] = start_time

    def calc(self):
        """
        如果当前测试信息self[-1]["step"、"plan_time"、"real_time"、"q"]存在时，
        计算下次测试的时间.

        :return: Non return, self.log is changed.
        """
        # 必须提供本次测试的信息，才能计算下次测试的时间
        if self[-1]["step"] is None:
            raise TypeError
        if self[-1]["real_time"] is None:
            raise TypeError
        if self[-1]["q"] is None:
            raise TypeError

        # 添加下次测试
        self.append({
            "step": None,
            "plan_time": None,
            "real_time": None,
            "q": None,
            "interval": None,
            "e": None
        })

        # 计算本次测试(和下次测试之间的)interval、下次测试step、下次测试plan_time
        if self[-2]["q"] < 3:
            # 计算本次测试(和下次测试之间)的interval：固定为1，和本次测试step无关。
            self[-2]["interval"] = timedelta(days=1)
            # 计算下次测试的step：重置为1
            self[-1]["step"] = 1
            # 计算下次测试的预计时间：
            self[-1]["plan_time"] = self[-2]["real_time"] + self[-2]["interval"]
        else:
            # 计算本次测试(和下次测试之间)的interval：
            if self[-2]["step"] == 1:
                self[-2]["interval"] = timedelta(days=1)
            elif self[-2]["step"] == 2:
                self[-2]["interval"] = timedelta(days=6)
            else:
                interval = round(self[-3]["interval"].days * self[-3]["e"])
                self[-2]["interval"] = timedelta(days=interval)
            # 计算下次测试的step：累加
            self[-1]["step"] = self[-2]["step"] + 1
            # 计算下次测试的预计时间：
            self[-1]["plan_time"] = self[-2]["real_time"] + self[-2]["interval"]

        # 计算本次测试（结束后）的e
        self[-2]["e"] = self[-3]["e"] - 0.8 + 0.28 * self[-2]["q"] - 0.02 * self[-2]["q"] ** 2
        if self[-2]["e"] < 1.3:
            self[-2]["e"] = 1.3

        # 是否记录历史
        if self.LOG != True:
            self = [self[-2]]

    def review(self, score, real_time=None):
        if real_time is None:
            if self.Time == True:
                real_time = datetime.now()
            else:
                real_time = date.today()
        if not isinstance(real_time, (date, datetime)):
            raise TypeError
        if not isinstance(score, (int, float)):
            raise TypeError
        elif score not in [0, 1, 2, 3, 4, 5]:
            raise RuntimeError
        # 如果处于错题循环中就不记录本次测试
        if (SM2.REPEAT == True) & (self.is_repeating != False) & (score != 5):
            return
        #
        self[-1]["real_time"] = real_time
        self[-1]["q"] = score
        self.calc()
        # 开始错题循环？
        if (SM2.REPEAT == True) & (self.is_repeating == False) & (score<SM2.REPEAT_THRESHOLD):
            self.is_repeating = real_time
        # 结束错题循环？
        if (SM2.REPEAT == True) & (self.is_repeating != False) & (score==5):
            self.is_repeating = False

    def when_to_review_next(self):
        if (SM2.REPEAT == True) & (self.is_repeating != False):
            return self.is_repeating
        else:
            return self[-1]["plan_time"]

    def get_proficiency(self):
        i = self[-2]["interval"].days
        if i > 365: return 1
        else: return pow(i/365, 0.5)  # 开方