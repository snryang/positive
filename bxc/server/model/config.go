package model

type Config struct {
	ID    uint   `gorm:"primary_key"`
	Key   string `gorm:"type:varchar(64)" json:"key"`
	Value string `gorm:"type:text" json:"value"`
}
