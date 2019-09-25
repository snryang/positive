让程序后台运行，关闭shell,不会关闭应用 nohup ./main & 

查看nginx安装目录 ps  -ef | grep nginx
查看nginx.conf配置文件目录

查看进程 ps -aux|grep proxy.py
杀进程   kill -9 7751

登录MYSQL： mysql -u root -p xxxx -h 127.0.0.1

创建一个laoli的账号，密码为12345678，可以任意电脑进行链接访问, 并且对jing_dong数据库中的所有表拥有所有权限
grant all privileges on jing_dong.* to "laoli"@"%" identified by "12345678"

刷新mysql权限 flush privileges; 