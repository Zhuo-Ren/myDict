from memo_manage import MemoGroup
from sm22 import SM2
import datetime

SM2.Time = True
SM2.LOG = True
SM2.REPEAT = False

cet4_tasks = MemoGroup()

cet4_tasks.add(SM2(item_info={"id": "apple_recognition"}))
cet4_tasks.add(SM2(item_info={"id": "apple_using"}))
cet4_tasks.add(SM2(item_info={"id": "apple_listen"}))
cet4_tasks.add(SM2(item_info={"id": "dog_pronunciation"}))
cet4_tasks.add(SM2(item_info={"id": "dog_recognition"}))

cet4_tasks["apple_recognition"].review(score=1, real_time=datetime.datetime(2020,1,10,12,2,2))
cet4_tasks["apple_using"].review(score=2, real_time=datetime.datetime(2020,1,10,12,2,2))
cet4_tasks["apple_listen"].review(score=3, real_time=datetime.datetime(2020,1,10,12,2,2))
cet4_tasks["dog_pronunciation"].review(score=4, real_time=datetime.datetime(2020,1,10,12,2,2))
cet4_tasks["dog_recognition"].review(score=5, real_time=datetime.datetime(2020,1,10,12,2,2))

cet4_tasks["apple_recognition"].review(score=1, real_time=datetime.datetime(2020,1,11,12,2,2))
cet4_tasks["apple_using"].review(score=2, real_time=datetime.datetime(2020,1,11,12,2,2))
cet4_tasks["apple_listen"].review(score=3, real_time=datetime.datetime(2020,1,12,12,2,2))
cet4_tasks["dog_pronunciation"].review(score=4, real_time=datetime.datetime(2020,1,11,12,2,2))
cet4_tasks["dog_recognition"].review(score=5, real_time=datetime.datetime(2020,1,11,12,2,2))

print(cet4_tasks.get_keys("id"))
print(cet4_tasks.get_on_test_keys(key="id", deadline=datetime.datetime(2020, 1, 13, 11, 11, 11)))
print([v.get_proficiency() for k, v in cet4_tasks.items()])

# import pickle
# f = open('../../../dict/review-1.pkl', 'wb')
# pickle.dump(cet4_tasks, f, -1)
# f.close()
#
# f = open('../../../dict/review-1.pkl', 'rb')
# pickle.load(f)