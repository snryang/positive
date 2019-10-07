package datasource

import (
	"strings"
	"time"

	"../conf"
	"../model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func GetDB() *gorm.DB {
	return db
}

func init() {
	path := strings.Join([]string{conf.Sysconfig.DBUserName, ":", conf.Sysconfig.DBPassword, "@(", conf.Sysconfig.DBIp, ":", conf.Sysconfig.DBPort, ")/", conf.Sysconfig.DBName, "?charset=utf8&parseTime=true"}, "")
	var err error
	db, err = gorm.Open("mysql", path)
	if err != nil {
		panic(err)
	}
	db.SingularTable(true)
	db.DB().SetConnMaxLifetime(1 * time.Second)
	db.DB().SetMaxIdleConns(20)   //最大打开的连接数
	db.DB().SetMaxOpenConns(2000) //设置最大闲置个数
	db.SingularTable(true)        //表生成结尾不带s
	// 启用Logger，显示详细日志
	db.LogMode(true)

	db.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8").AutoMigrate(&model.User{}, &model.Config{}, &model.UserDetail{}, &model.Moments{}, &model.MomentsReply{}, &model.UserLifePhoto{}, &model.UserLimit{}, &model.UserGrass{})

}
