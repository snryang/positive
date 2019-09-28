package model

type Config struct {
	ID    int    `gorm:"primary_key"`
	Name  string `gorm:"type:varchar(64)" json:"name"`
	Key   string `gorm:"type:varchar(64)" json:"key"`
	Value string `gorm:"type:text" json:"value"`
}
