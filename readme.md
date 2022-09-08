# 安装
- 安装anaconda

- 创建虚拟环境：
    `conda create -n myDict python=3.6`
    
- 进入虚拟环境
    `conda activate myDict`
    
- 安装三方依赖

    `pip install flask`
    
    `pip install datetime `(这个包conda里找不到，只能pip)
    
- 安装本地依赖
    - 在虚拟环境根目录（例如D:\ProgramFiles\anaconda3\envs\myDict）下添加
      mypath.pth文件。文件内写入
      ```
      E:\ProgramCode\dbsql
      E:\ProgramCode\sm2
      ```
    - [dbsql](https://github.com/Zhuo-Ren/dbsql.git)和[sm2](https://github.com/Zhuo-Ren/sm2)是我自己写的工具包

# 运行
- 运行`UI.py`即可。

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