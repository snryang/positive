package service

import (
	"fmt"
	"time"

	"../model"
)

type UserService struct{}

func (u UserService) GetById(id uint) (user model.User, err error) {
	err = db.First(&user, id).Error
	return
}

func (u UserService) GetById32(id32 string) (user model.User, err error) {
	err = db.Where(&model.User{Id32: id32}).First(&user).Error
	return
}

func (u UserService) GetByPhone(phone string) (user model.User, err error) {
	err = db.Where(&model.User{Phone: phone}).First(&user).Error
	return
}

func (u UserService) Save(user model.User) (err error) {
	if user.ID != 0 {
		err = db.Save(&user).Error
	} else {
		err = db.Create(&user).Error
	}
	return
}

func (u UserService) GetUserDetailById(userid uint) (userDetail model.UserDetail, err error) {
	err = db.Where(&model.UserDetail{UserID: userid}).First(&userDetail).Error
	return
}

func (u UserService) SaveDetail(userDetail model.UserDetail) (err error) {
	obj, objErr := u.GetUserDetailById(userDetail.UserID)
	if objErr == nil {
		fmt.Println("update UserDetail")
		userDetail.ID = obj.ID
		err = db.Save(&userDetail).Error
	} else {
		fmt.Println("insert UserDetail")
		err = db.Create(&userDetail).Error
	}
	return
}

func (u UserService) GetUserLifePhoto(userid uint) (userLifePhoto []model.UserLifePhoto) {
	db.Find(&userLifePhoto, "userid = ?", userid)
	return
}

func (u UserService) RemoveUserLifePhoto(userid uint, url string) {
	db.Delete(&model.UserLifePhoto{UserID: userid, Url: url})
}

func (u UserService) InsertUserLifePhoto(userid uint, url string) {
	db.Create(&model.UserLifePhoto{UserID: userid, Url: url})
}

func (u UserService) AllowAction(userid uint, action string) bool {
	var userLimit model.UserLimit
	if (db.Where(&model.UserLimit{UserID: userid, Type: action}).First(&userLimit).Error != nil) {
		return true
	} else {
		return time.Now().After(userLimit.Nexttime)
	}
}

//设置用户second秒后才能执行动作action
func (u UserService) SetActionTime(userid uint, action string, second int) {

	nexttime := time.Now().Add(time.Duration(second) * time.Minute)
	userLimit := model.UserLimit{UserID: userid, Type: action, Nexttime: nexttime}

	if db.Save(&userLimit).Error != nil {
		db.Create(&userLimit)
	}

}
