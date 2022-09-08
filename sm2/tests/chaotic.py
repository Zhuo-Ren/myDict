import datetime

# sm2包的效果
from sm22 import SM2
SM2.LOG = True
SM2.Time = True
SM2.REPEAT = False
if 1:  # 没有按时复习
    print("#" * 30)
    a_instance = SM2(item_info={"id":"apple"})
    # 学习
    # 1st tests
    t = datetime.datetime(2021, 2, 7, 2, 22, 22)
    q = 3
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 2nd tests
    t = datetime.datetime(2021, 2, 9, 3, 33, 33)
    q = 5
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 3th tests
    t = datetime.datetime(2021, 2, 16, 4, 44, 44)
    q = 4
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 4th tests
    t = datetime.datetime(2021, 3, 1, 4, 44, 44)
    q = 4
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())

# supermemo2包的效果
print("#"*30)
from supermemo2 import SMTwo
# 1th review
d = datetime.date(2021,2,7)
q = 3
review = SMTwo.first_review(q, d)
print("在%s测试得到%s分。" % (d, q))
print("预计下次测试在:", review.review_date)
# 2th review
d = datetime.date(2021,2,9)
q = 5
review = SMTwo(review.easiness, review.interval, review.repetitions).review(q, d)
print("在%s测试得到%s分。" % (d, q))
print("预计下次测试在:", review.review_date)
# 3th review
d = datetime.date(2021, 2, 16)
q = 4
review = SMTwo(review.easiness, review.interval, review.repetitions).review(q, d)
print("在%s测试得到%s分。" % (d, q))
print("预计下次测试在:", review.review_date)
# 4th review
d = datetime.date(2021, 3, 1)
q = 4
review = SMTwo(review.easiness, review.interval, review.repetitions).review(q, d)
print("在%s测试得到%s分。" % (d, q))
print("预计下次测试在:", review.review_date)


# sm2包的效果(开启错题循环)
SM2.LOG = True
SM2.Time = True
SM2.REPEAT = True
SM2.REPEAT_THRESHOLD = 3
if 1:  # 没有按时复习
    print("#" * 30)
    a_instance = SM2(item_info={"id":"apple"})
    # 学习
    # 1st tests
    t = datetime.datetime(2021, 2, 7, 2, 22, 22)
    q = 3
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 2nd tests
    t = datetime.datetime(2021, 2, 9, 3, 33, 33)
    q = 5
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 3th tests
    t = datetime.datetime(2021, 2, 16, 4, 44, 44)
    q = 4
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())
    # 4th tests
    t = datetime.datetime(2021, 3, 1, 4, 44, 44)
    q = 4
    a_instance.review(q, t)
    print("在%s测试得到%s分。" % (t, q))
    # 计算下一次测试的时间
    print("预计下次测试在:", a_instance.when_to_review_next())