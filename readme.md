# 安装
- 安装anaconda

- 创建虚拟环境：
    `conda create -n myDict python=3.6`
    
- 进入虚拟环境：
    `conda activate myDict`
    
- 安装三方依赖：

    `pip install flask`
    
    `pip install datetime `(这个包conda里找不到，只能pip)
    
- 安装本地依赖：[dbsql](https://github.com/Zhuo-Ren/dbsql.git)和[sm2](https://github.com/Zhuo-Ren/sm2)是我自己写的工具包，需要引用它们。
    - 我自己可以在虚拟环境根目录（例如D:\ProgramFiles\anaconda3\envs\myDict）下添加
      mypath.pth文件。文件内写入
      ```
      E:\ProgramCode\dbsql
      E:\ProgramCode\sm2
      ```
    - 但为了其他用户方便，我直接把两个包放到工作路径下了，所以你其实什么都不用做...

# 运行
- 运行`UI.py`即可。然后根据提示，访问`http://127.0.0.1:5001/view/`（字典）或`http://127.0.0.1:5001/review/`（复习单词）。
- 当然你可以从零开始运行（即/dict/目录下啥都没有），所有的词项你需要自己添加。但有一个基础词典可能更加方便。用户可以基于[词典抽取](https://github.com/Zhuo-Ren/Oxford9Extraction)项目来获得牛津词典第九版，把此项目中的`/static/oxford9`目录和`/dict/entry.sqlite`文件copy到本项目中（路径不变）即可。为了方便，本项目已经包含上述目录，但完整的`/dict/entry.sqlite`太大，本项目中只放了一个部分版（字典大概到abandon...）。想要完整的就去[词典抽取](https://github.com/Zhuo-Ren/Oxford9Extraction)项目中找。

# 原理
* 使用自己写的dbsql库来实现对不同数据库类型的封装。
  这样只需在使用时（本项目中是storage_sqlite.py）把
  `from dbsql_sqlite import DbSql`
  改成`from dbsql_mysql import DbSql`
  就可以方便的切换各种数据库了。 
  相关文件由.pth方式作为三方包导入，参见“安装”。
* 使用storage_api.py实现对字典不同存储方式的封装。
  这样只需在使用时`from storage_sqlite import StorageSqlite as Storage`
  改成`from storage_mysql import StorageSqlite as Storage`
  就可以方便的切换各种存储方式了。 
  和上边的dbsql不同，这里的存储方式是针对entry的，设计了字段等定制化信息，
  所以是项目内，而不是三方包。
  storage_api.py中是接口类。storage_sqlite.py使用sqlite数据库实现了这个接口类。
* 字典以sqlite的格式存放在dict/entry.sqlite中。复习情况以pkl的格式存放在dict/review.pkl中。
* sm2文件夹里包含两个包：sm2包是对supermemo2算法的实现（有所改编），memo_manage包则实现对多个sm2实例的统一管理。本项目中的背单词复习策略就是基于上述算法。
* 词项内容的编写使用了一套我自己设计的标记文本，类似于markdown。区别在于定制能力，例如#d标签标志一个词性，并用特殊的方式加以可视化。用户可以自己定制：在/static/mark-render/labels.js和labels.css中定义新的标签，并在/static/mark-render/mark_render.js的最末尾注册新标签。一个标记文本案例如:
    ```
    #s apple
    #p [appl:e](名词)@@A
    #p /apple:3/(动词)@@B
    #p /app:/(失爆)
    #m
      #d n.v.
        苹果。 @@zh
        A kind of fruit.  @@en
      #e CET4
        I like apple. @@en
        我喜欢苹果。 @@zh
        #v d/b.mp4#130-133 @@zh
    ```
* 相比于常见的背单词软件，这个项目的特点是对一个单词可以制定多种复习方式，例如练习拼写就显示音标、词性、词义和例句（本词用~代替），同时隐藏单词本身；例如练习发音就显示拼写、词性、词义和例句，但隐藏音标。用户在字典页面搜索这个词项，然后选择复习策略，最后点击“添加复习”按钮即可。用户可以自定义复习策略：在`/static/displayStrategy`中创建新的css文件来定义新的复习策略；在`/static/js/event.js`中搜索`<option value ='all' selected='selected'>all</option>`，模仿注册新策略。

* 用户有空的时候就打开复习页面，复习页面会基于复习算法（就是上边说的那个supermemo2变种）来输出你要复习的内容。