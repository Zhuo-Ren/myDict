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
        return [self[i].item_info[key] for i in self.keys()]

    def get_on_test_keys(self, key="id", deadline=None):
        """

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
