package model

type Result struct {
	Success bool        `json:"success"`
	Msg     string      `json:"msg"`
	Data    interface{} `json:"data"`
}

func NewResult(data interface{}, c bool, m string) Result {
	return Result{Data: data, Success: c, Msg: m}
}
