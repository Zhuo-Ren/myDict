# Introduction
This is a Python implement of SM-2 algorithm.
You can get a introduction of this algorithm from
 `https://www.supermemo.com/en/archives1990-2015/english/ol/sm2` 
 or [my doc](./sm2-intro)(in Chinese).
 
 # related works
 There is a pipy package called supermemo2.
 But our package has the following advantages:
 - 纪录历史（用于展示学习历史或计算熟练度）。当配置SM2.LOG = True时启用历史记录。
 - 支持date级和datetime级两种精度。当配置SM2.TIME = True时使用datetime级精度。
 - 对非按时学习的情况，提供特殊处理（sm2算法是理想情况，没有说明对不按时复习的情况如何处理）。
    - 复习晚了：计划让我1号复习，我3号复习的。策略是照常计算interval，下次复习计划在（3+interval）号。
    - 复习早了：同上。
    - 这一点，supermemo2包貌似采取了相同的策略，我不确定。
 - 对是否学习成功提供特殊处理。
    - sm2算法中，如果我的测试成绩是2，很不理想，算法会让我在第二天继续复习。问题是仅通过一次测试，我大概率记不住这个知识点。正确的做法是重复。测试，在多次测试中来学习它，直到取得5分的满分才停止重复。SM2.REPEAT = False时，采用原本的sm2算法；为True时，对每个低分（得分小于SM2.REPEAT_THRESHOLD的）知识点，在“从最近一次获得低分的时间开始的24小时”内始终认为需要复习，直到获得满分。(这一过程不计入历史)
 - 支持熟练度评估。

# Example
## Init
Import the package.

    from sm2 import SM2
    import datetime

Config the package. "LAWFUL" means user will test the item at the plan time that given by the SM-2 algorithm each time. 就是说用户严格按照算法计算的时间进行测试(复习)，不会提前，也不会更晚。

    SM2.LAWFUL_or_CHAOTIC = "LAWFUL"

Create a sm2 obj for one memory item.
为一个记忆项创建一个sm2对象（比如要背一个单词）。
    
    a_instance = SM2()

Obviously, a sm2 obj does not save content info(ex. the word you want to remember.)
A sm2 obj only force on the memory log. After the above commend, the sm2 obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=None, real_time=None, q=None, interval=None, e=None

# 1th test
In 2021.2.7, user test this remember item for the 1st time and get 3 points.

    a_instance[-1]["plan_time"] = datetime.date(2021, 2, 7)
    a_instance[-1]["q"] = 3
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=None, e=None

Calc the plan time for the next test.

    a_instance.calc()
    print(a_instance[-1]["plan_time"])  # 2021-02-08
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=None, interval=None, e=None

# 2nd test
In the return day (2021.2.8), user test the item for the 2nd time and get 5 points.
    a_instance[-1]["q"] = 5
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=None, e=None

Calc the plan time for the next test.

    a_instance.calc()
    print(a_instance[-1]["plan_time"])  # 2021-02-14
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=6, e=2.46
- 3: step=3, plan_time=2021-2-14, real_time=None, q=None, interval=None, e=None

# 3th tests
In the return day (2021.2.14), user test the item for the 3th time and get 4 points.
    
    a_instance[-1]["q"] = 4
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=6, e=2.46
- 3: step=3, plan_time=2021-2-14, real_time=None, q=4, interval=None, e=None

Calc the plan time for the next test.

    a_instance.calc()
    print(a_instance[-1]["plan_time"])  # 2021-03-01
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=6, e=2.46
- 3: step=3, plan_time=2021-2-14, real_time=None, q=4, interval=15, e=2.46
- 4: step=4, plan_time=2021-3-1, real_time=None, q=None, interval=None, e=None

# 4th tests
In the return day (2021.3.1), user test the item for the 4th time and get 2 points.

**If user get a score less than 3, 
the algorithm will return to step 1 without update the e.**

    a_instance[-1]["q"] = 2
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=6, e=2.46
- 3: step=3, plan_time=2021-2-14, real_time=None, q=4, interval=15, e=2.46
- 4: step=4, plan_time=2021-3-1, real_time=None, q=2, interval=None, e=None

Calc the plan time for the next test.

    a_instance.calc()
    print(a_instance[-1]["plan_time"])  # 2021-03-02
    
After the above commend, the item obj maintain a log as:
- 0: step=0, plan_time=None, real_time=None, q=None, interval=-1, e=2.5
- 1: step=1, plan_time=2021-2-7, real_time=None, q=3, interval=1, e=2.36
- 2: step=2, plan_time=2021-2-8, real_time=None, q=5, interval=6, e=2.46
- 3: step=3, plan_time=2021-2-14, real_time=None, q=4, interval=15, e=2.46
- 4: step=4, plan_time=2021-3-1, real_time=None, q=2, interval=1, e=2.14
- 5: step=1, plan_time=2021-3-2, real_time=None, q=None, interval=None, e=????







