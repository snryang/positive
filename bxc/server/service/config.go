package service

import (
	"fmt"

	"../model"
)

type ConfigService struct{}

//获取配置Key的值
func (c ConfigService) Get(key string) (value string) {
	var config model.Config

	if db.Where("`key` = ?", key).First(&config).Error != nil {
		value = ""
	} else {
		value = config.Value
	}
	fmt.Println(config)
	return
}

func (c ConfigService) Save(key string, value string) {
	var config model.Config

	if db.Where("`key` = ?", key).First(&config).Error != nil {
		config.Key = key
		config.Value = value
		config.Name = key
		db.Create(&config)
	} else {
		config.Value = value
		db.Save(&config)
	}
	return
}
