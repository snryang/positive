package req

import (
	"time"
)

type UserRegister struct {
	Phone         string `json:"phone"`
	Password      string `json:"password"`
	Gender        string `json:"gender"`
	Nickname      string `json:"nickname"`
	IvitationCode string `json:"invitationCode"`
}

type Req_search_moments struct {
	MomentsID string    `json:"momentsID"`
	Created   time.Time `json:"created"`
	UserID    int       `json:"userID"`
	Tag       string    `json:"tag"`
	PageSize  int       `json:"pageSize"`
}

type Res_userinfo struct {
	ID       int    `json:"id"`
	Avatar   string `json:"avatar"`
	Gender   string `json:"gender"`
	Nickname string `json:"nickname"`
}
