package service

import (
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
		err = db.Create(&userDetail).Error
	} else {
		userDetail.ID = obj.ID
		err = db.Save(&userDetail).Error
	}
	return
}
