package service

import (
	"time"

	"../model"
)

type MomentsService struct{}

func (u MomentsService) Get(momentsId string) (moments model.Moments, err error) {
	err = db.First(&moments, momentsId).Error
	return
}

func (u MomentsService) Add(moments *model.Moments) {
	moments.Created = time.Now()
	db.Save(moments)
}

func (u MomentsService) AddReply(momentsReply *model.MomentsReply) {
	momentsReply.Created = time.Now()
	db.Save(momentsReply)
}

func (u MomentsService) SearchMoments(momentsID string, created time.Time, userID int, tag string, pageSize int) (items []model.Moments) {
	_filter := db.Where("1 = ?", 1)
	if momentsID != "" {
		_filter = _filter.Where("`id`<>?", momentsID).Where("`created`<=?", created)
	}
	if userID > 0 {
		_filter = _filter.Where("`userid`=?", userID)
	}
	if tag != "" {
		_filter = _filter.Where("`tag`=?", tag)
	}
	_filter.Limit(pageSize).Order("`created` desc").Find(&items)
	return
}

func (u MomentsService) SearchMomentsReply(momentsID string, pageSize int) (items []model.MomentsReply) {
	db.Where("`momentsId`=?", momentsID).Limit(pageSize).Find(&items)
	return
}
