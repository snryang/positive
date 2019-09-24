package model

import "time"

type Moments struct {
	ID      string    `gorm:"primary_key;type:varchar(36)" json:"id"`
	UserID  uint      `gorm:"column:userid" json:"userid"`
	Tag     string    `gorm:"type:varchar(64)" json:"tag"`
	Text    string    `gorm:"type:varchar(1024)" json:"text"`
	Img     string    `gorm:"type:varchar(512)" json:"img"` //多个图片;分隔
	Video   string    `gorm:"type:varchar(128)" json:"video"`
	Created time.Time `json:"created"`
}

type MomentsReply struct {
	ID        string    `gorm:"primary_key;type:varchar(36)" json:"id"`
	MomentsID string    `gorm:"type:varchar(36);column:moments_id" json:"momentsId"`
	ToUser    uint      `gorm:"column:to_user" json:"toUser"`
	FromUser  uint      `gorm:"column:from_user" json:"fromUser"`
	Text      string    `gorm:"type:varchar(512)" json:"text"`
	Created   time.Time `json:"created"`
}
