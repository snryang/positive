package req

type UserRegister struct {
	Phone         string `json:"phone"`
	Password      string `json:"password"`
	Gender        string `json:"gender"`
	Nickname      string `json:"nickname"`
	IvitationCode string `json:"invitationCode"`
}
