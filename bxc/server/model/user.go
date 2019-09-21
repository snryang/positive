package model

import (
	"time"
)

//`gorm:"default:'galeone'"`
type User struct {
	ID        uint      `gorm:"primary_key"`
	CreatedAt time.Time `json:"created_at"`
	Id32      string    `gorm:"type:varchar(36)" json:"id32"`
	Phone     string    `gorm:"type:varchar(11)" json:"phone"`
	Password  string    `gorm:"type:varchar(200)" json:"password"`
	Gender    string    `gorm:"type:varchar(16)" json:"gender"`
	Nickname  string    `gorm:"type:varchar(32)" json:"nickname"`
	// Json      string    `gorm:"type:text" json:"json"`
}

type UserDetail struct {
	ID     uint `gorm:"primary_key"`
	UserID uint `gorm:"column:userid" json:"userid"`

	wx          string `gorm:"type:varchar(32)"`
	Phone       string `gorm:"type:varchar(11)" json:"phone"`
	Name        string `gorm:"type:varchar(32)"`
	Gender      string `gorm:"type:varchar(16)" json:"gender"`
	Nationality string `gorm:"type:varchar(16)"`
	Birth       time.Time
	Height      int
	Weight      int
	//学历
	Education string `gorm:"type:varchar(16)"`
	//星座
	Constellation string `gorm:"type:varchar(16)"`
	//职业
	Profession string `gorm:"type:varchar(32)"`
	//年薪
	Salary string `gorm:"type:varchar(32)"`
	Car    string `gorm:"type:varchar(16)"`
	House  string `gorm:"type:varchar(16)"`
	//当前地址
	Address string `gorm:"type:varchar(32)"`
	//家乡
	Hometown string `gorm:"type:varchar(32)"`
	//______以上为基础信息

	Sex   string `gorm:"type:varchar(32)"`
	Smoke string `gorm:"type:varchar(32)"`
	Drink string `gorm:"type:varchar(32)"`
	Pet   string `gorm:"type:varchar(128)"`
	//饮食习惯
	Diet string `gorm:"type:varchar(128)"`
	//兴趣爱好
	Hobbies string `gorm:"type:varchar(256)"`
	//个人标签
	Label string `gorm:"type:varchar(256)"`
	//自我介绍
	SelfIntroduction string `gorm:"type:varchar(1024)" json:"selfIntroduction"`

	// Json      string    `gorm:"type:text" json:"json"`

	//对对方的要求
	ForAge       string `gorm:"type:varchar(32)"`
	ForHeight    string `gorm:"type:varchar(32)"`
	ForWeight    string `gorm:"type:varchar(32)"`
	ForEducation string `gorm:"type:varchar(32)"`
	ForSalary    string `gorm:"type:varchar(32)"`
	ForCar       string `gorm:"type:varchar(32)"`
	ForHouse     string `gorm:"type:varchar(32)"`
	ForAddress   string `gorm:"type:varchar(32)"`
	ForHometown  string `gorm:"type:varchar(32)"`
	ForSex       string `gorm:"type:varchar(32)"`
	ForSmoke     string `gorm:"type:varchar(32)"`
	ForDrink     string `gorm:"type:varchar(32)"`
	ForPet       string `gorm:"type:varchar(32)"`
}
