package session

import (
	"github.com/gorilla/securecookie"
	"github.com/kataras/iris/sessions"
)

type session struct{}

var S = &session{}

var _irisSession = &sessions.Sessions{}

func init() {
	secureCookie := securecookie.New([]byte("hashKey-bxc-ywbcalm"), []byte("blockKey-bxc-ywbcalm"))
	_irisSession = sessions.New(sessions.Config{
		Cookie:       "bxcsessionid",
		Encode:       secureCookie.Encode,
		Decode:       secureCookie.Decode,
		AllowReclaim: true,
	})

}

func IrisSession() *sessions.Sessions {
	return _irisSession
}
