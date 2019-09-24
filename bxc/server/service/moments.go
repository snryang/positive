package service

import (
	"../model"
)

type MomentsService struct{}

func (u MomentsService) Add(moments *model.Moments) {
	db.Save(moments)
}
