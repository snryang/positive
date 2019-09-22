腾讯云主机安装nginx https://www.jianshu.com/p/1cad13e57c43
安装myasql: https://cloud.tencent.com/developer/article/1157156
            https://blog.csdn.net/runner1920/article/details/79495368
            https://www.cnblogs.com/xcsn/p/10424677.html


            https://github.com/airyland/vux


### go 
- https://www.jianshu.com/p/db9e6ae0d227  gopm
- http://gorm.book.jasperxu.com/
- iris https://www.studyiris.com/doc/irisDoc/Overview.html

- https://www.jianshu.com/p/37f1d9265fd0 vscode 


### 部署golang
方法二：本地编译
cmd控制台到main.go文件目录下
set GOARCH=amd64
set GOOS=windows
set GOOS=linux
go build main.go
会生成一个没有后缀的二进制文件
main
将该文件放入linux系统某个文件夹下
赋予权限
chmod 777 main
最后执行 ./main 就行了。
如果想让项目在后台执行：执行 nohup ./main & ，这样就可以程序在后台运行了
