from sm2 import SM2
from typing import Dict, Union, Optional
from datetime import datetime, date


class MemoGroup(Dict[str, SM2]):
    def __init__(self, from_info=None):
        if isinstance(from_info, dict):
            for k, v in from_info.items():
                self[k] = SM2(item_info=k, log=v)

    def add(self, new_sm2_obj: SM2):
        if new_sm2_obj.item_info["id"] in self:
            raise RuntimeError
        else:
            new_sm2_obj.start_review()  # 当前版本中，添加到复习列表中同时就开始复习
            self[new_sm2_obj.item_info["id"]] = new_sm2_obj

    def get_keys(self, key="id"):
        """
        获取所有sm2 obj的item_info中的某个特征值（默认是获取“id”）

        :param key:
        :return:
        """
        return [self[i].item_info[key] for i in self.keys()]

    def get(self, key="id", target={}):
        """
        获取符合target中条件的对象（或对象特征）。
        如果key=None，则获取sm2_obj；如果key=字符串，则获取sm2_obj.item_info[key]
        判定条件target是一个字典，如果一个sm2_obj的item_info包含了target中的内容，则认为这个sm2_obj符合条件。
        返回列表

        :param key:
        :param target:
        :return:
        """
        r = []
        for i in self.keys():
            i = self[i]
            flag = True
            for k, v in target.items():
                if k in i.item_info:
                    if v == i.item_info[k]:
                        pass
                    else:
                        flag = False
                else:
                    flag = False
            if flag:
                if key is None:
                    r.append(i)
                else:
                    r.append(i.item_info[key])
        return r


    def get_on_test_keys(self, key="id", deadline=None):
        """
        获取需要测试的sm2 obj的item_info中的某个特征值（默认是获取“id”）

        :param key: 对需要复习的项，输出其那个属性。默认输出id。
        :type key: str
        :param deadline: 基于什么时间判断是否需要复习。通常是基于当前时间。
        :type deadline: Union[None, date, datetime]
        :return:
        """
        r = []
        if SM2.Time == True:
            if deadline == None:
                deadline = datetime.now()
            elif not isinstance(deadline, datetime):
                raise TypeError
        else:
            if deadline == None:
                deadline = date.today()
            elif not isinstance(deadline, date):
                raise TypeError
        for k, v in self.items():
            plan_time = v.when_to_review_next()
            if plan_time < deadline:
                r.append(v.item_info[key])
        return r

