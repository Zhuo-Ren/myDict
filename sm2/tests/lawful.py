from sm22 import SM2
import datetime

SM2.LAWFUL_or_CHAOTIC = "LAWFUL"

a_instance = SM2(item_info="apple")
# 学习
# 1st tests
a_instance[-1]["plan_time"] = datetime.date(2021, 2, 7)
a_instance[-1]["q"] = 3
# 计算下一次测试的时间
a_instance.calc()
print(a_instance[-1]["plan_time"])
# 2nd tests
a_instance[-1]["q"] = 5
# 计算下一次测试的时间
a_instance.calc()
print(a_instance[-1]["plan_time"])
# 3th tests
a_instance[-1]["q"] = 4
# 计算下一次测试的时间
a_instance.calc()
print(a_instance[-1]["plan_time"])
# 4th tests
a_instance[-1]["q"] = 2
# 计算下一次测试的时间
a_instance.calc()
print(a_instance[-1]["plan_time"])

# supermemo2包的效果
print("#"*30)
from supermemo2 import first_review, SMTwo
smtwo = SMTwo()
smtwo.calc(3, 2.5, 1, 1, datetime.date(2021, 2, 7))
print(smtwo.review_date)
record = smtwo.dict(curr=True)
record["quality"] = 5
smtwo.calc(**record)
print(smtwo.review_date)
record = smtwo.dict(curr=True)
record["quality"] = 4
smtwo.calc(**record)
print(smtwo.review_date)

