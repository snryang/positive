package main

import (
	"fmt"
	"time"

	"./model"
	"./req"
	"./service"
	"github.com/kataras/iris"
	uuid "github.com/satori/go.uuid"
)

var configService = service.ConfigService{}
var userService = service.UserService{}

func main() {
	app := iris.New()

	app.HandleDir("/", "./public")

	app.Post("api/user/reg", Reg)
	app.Post("api/user/login", Login)
	app.Get("api/userdetail/{id32}", GetUserDetail)
	app.Post("api/userdetail/save/{id32}", SaveUserDetail)

	// app.Post("api/user/reg", func(ctx iris.Context) {

	// 	configValue := configService.Get("ywbTest")
	// 	ctx.WriteString("value:" + configValue)
	// })

	app.Run(iris.Addr(":8099"))
}

func Reg(ctx iris.Context) {

	var userRegister req.UserRegister
	err := ctx.ReadJSON(&userRegister)
	fmt.Println("register")
	fmt.Println(userRegister)
	if err == nil {
		_, err = userService.GetByPhone(userRegister.Phone)
		if err == nil {
			ctx.JSON(model.NewResult(nil, false, "手机号已被注册"))
			return
		}
		user := model.User{}
		user.Phone = userRegister.Phone
		user.Password = userRegister.Password
		user.Gender = userRegister.Gender
		user.Nickname = userRegister.Nickname
		user.CreatedAt = time.Now()
		user.Id32 = uuid.Must(uuid.NewV4()).String()
		userService.Save(user)
		ctx.JSON(model.NewResult(nil, true, "注册成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}

func Login(ctx iris.Context) {
	var userRegister req.UserRegister
	err := ctx.ReadJSON(&userRegister)
	fmt.Println("Login")
	fmt.Println(userRegister)
	if err == nil {
		var user model.User
		user, err = userService.GetByPhone(userRegister.Phone)
		if err != nil {
			ctx.JSON(model.NewResult(nil, false, "帐号不正确"))
			return
		} else {
			if user.Password != userRegister.Password {
				ctx.JSON(model.NewResult(nil, false, "密码不正确"))
				return
			}
		}
		//每次登录修改id32标识
		user.Id32 = uuid.Must(uuid.NewV4()).String()
		userService.Save(user)
		ctx.JSON(model.NewResult(user, true, "登录成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}
func GetUserDetail(ctx iris.Context) {
	user, err := userService.GetById32(ctx.Params().Get("id32"))
	if err == nil {
		userDetail, _ := userService.GetUserDetailById(user.ID)
		ctx.JSON(model.NewResult(userDetail, true, ""))
		return
	}
	ctx.JSON(model.NewResult(nil, false, "用户信息不存在"))

}
func SaveUserDetail(ctx iris.Context) {
	id32 := ctx.Params().Get("id32")
	var userDetail model.UserDetail
	err := ctx.ReadJSON(&userDetail)
	fmt.Println("SaveUserDetail")
	fmt.Println(userDetail)
	if err == nil {
		user, _ := userService.GetById(userDetail.UserID)
		if user.Gender != userDetail.Gender {
			user.Gender = userDetail.Gender
			userService.Save(user)
		}
		fmt.Println(user.Id32, "==", id32)
		if user.Id32 != id32 {
			ctx.JSON(model.NewResult(nil, false, "非法操作"))
			return
		}

		userService.SaveDetail(userDetail)
		ctx.JSON(model.NewResult(nil, true, "操作成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}
