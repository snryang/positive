package model

import (
	"time"
)

type User struct {
	ID        uint      `gorm:"primary_key"`
	CreatedAt time.Time `json:"created_at"`
	Id32      string    `gorm:"type:varchar(32)" json:"id32"`
	Phone     string    `gorm:"type:varchar(11)" json:"phone"`
	Password  string    `gorm:"type:varchar(200)" json:"password"`
	Gender    int       `gorm:"type:int;" json:"gender"`
	Nickname  string    `gorm:"type:varchar(32)" json:"nickname"`
	Json      string    `gorm:"type:text" json:"json"`
}
