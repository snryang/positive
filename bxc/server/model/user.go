package model

import (
	"time"
)

//`gorm:"default:'galeone'"`
type User struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	Id32      string    `gorm:"type:varchar(36)" json:"id32"`
	Phone     string    `gorm:"type:varchar(11)" json:"phone"`
	Password  string    `gorm:"type:varchar(200)" json:"password"`
	Gender    string    `gorm:"type:varchar(16)" json:"gender"`
	Nickname  string    `gorm:"type:varchar(32)" json:"nickname"`
	// Json      string    `gorm:"type:text" json:"json"`
}

type UserDetail struct {
	ID          uint      `gorm:"primary_key" json:"id"`
	UserID      uint      `gorm:"column:userid" json:"userid"`
	Wx          string    `gorm:"type:varchar(32)" json:"wx"`
	Phone       string    `gorm:"type:varchar(11)" json:"phone"`
	Name        string    `gorm:"type:varchar(32)" json:"name"`
	Gender      string    `gorm:"type:varchar(16)" json:"gender"`
	Nationality string    `gorm:"type:varchar(16)" json:"nationality"`
	Birth       time.Time `json:"birth"`
	Height      int       `json:"height"`
	Weight      int       `json:"weight"`
	//学历
	Education string `gorm:"type:varchar(16)" json:"education"`
	//星座
	Constellation string `gorm:"type:varchar(16)" json:"constellation"`
	//职业
	Profession string `gorm:"type:varchar(32)" json:"profession"`
	//年薪
	Salary string `gorm:"type:varchar(32)" json:"salary"`
	Car    string `gorm:"type:varchar(16)" json:"car"`
	House  string `gorm:"type:varchar(16)" json:"house"`
	//当前地址
	Address string `gorm:"type:varchar(32)" json:"address"`
	//家乡
	Hometown string `gorm:"type:varchar(32)" json:"hometown"`
	//______以上为基础信息

	Sex   string `gorm:"type:varchar(32)" json:"sex"`
	Smoke string `gorm:"type:varchar(32)" json:"smoke"`
	Drink string `gorm:"type:varchar(32)" json:"drink"`
	Pet   string `gorm:"type:varchar(128)" json:"pet"`
	//饮食习惯
	Diet string `gorm:"type:varchar(128)" json:"diet"`
	//兴趣爱好
	Hobbies string `gorm:"type:varchar(256)" json:"hobbies"`
	//个人标签
	Label string `gorm:"type:varchar(256)" json:"label"`
	//自我介绍
	SelfIntroduction string `gorm:"type:varchar(1024)" json:"selfIntroduction"`

	// Json      string    `gorm:"type:text" json:"json"`

	//对对方的要求
	ForAge       string `gorm:"type:varchar(32)" json:"forAge"`
	ForHeight    string `gorm:"type:varchar(32)" json:"forHeight"`
	ForWeight    string `gorm:"type:varchar(32)" json:"forWeight"`
	ForEducation string `gorm:"type:varchar(32)" json:"forEducation"`
	ForSalary    string `gorm:"type:varchar(32)" json:"forSalary"`
	ForCar       string `gorm:"type:varchar(32)" json:"forCar"`
	ForHouse     string `gorm:"type:varchar(32)" json:"forHouse"`
	ForAddress   string `gorm:"type:varchar(32)" json:"forAddress"`
	ForHometown  string `gorm:"type:varchar(32)" json:"forHometown"`
	ForSex       string `gorm:"type:varchar(32)" json:"forSex"`
	ForSmoke     string `gorm:"type:varchar(32)" json:"forSmoke"`
	ForDrink     string `gorm:"type:varchar(32)" json:"forDrink"`
	ForPet       string `gorm:"type:varchar(32)" json:"forPet"`
}
