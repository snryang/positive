package service

import (
	"fmt"

	"../datasource"
	"../model"
)

var db = datasource.GetDB()

//获取配置Key的值
func Get(key string) (value string) {
	var config model.Config

	if db.Where("`key` = ?", key).First(&config).Error != nil {
		value = ""
	} else {
		value = config.Value
	}
	fmt.Println(config)
	return
}

func Register(phone string, password string, gender int, nickname string, json string) (res model.Result) {
	res.Success = false
	res.Msg = "TODO"
	return
}

func Login(phone string, password string) (res model.Result) {

	res.Success = false
	res.Msg = "TODO"
	return
}
