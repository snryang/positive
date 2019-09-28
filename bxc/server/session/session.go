package session

import (
	"github.com/gorilla/securecookie"
	"github.com/kataras/iris/sessions"
)

type session struct{}

var S = &session{}

var _irisSession = &sessions.Sessions{}

func init() {
	secureCookie := securecookie.New([]byte("bxc-big-and-secret-fash-ywb-hash"), []byte("bxc-secret-of-characters-ywb-key"))
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
