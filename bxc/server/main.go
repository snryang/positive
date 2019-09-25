package main

import (
	"context"
	"crypto/md5"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"./model"
	"./req"
	"./session"
	"./service"
	"github.com/kataras/iris"
	uuid "github.com/satori/go.uuid"
)

//https://iris-go.com/start/#another-example-query-post-form demo
var configService = service.ConfigService{}
var userService = service.UserService{}

const maxSize = 3 << 20 // 3MB 图片最大3M

func main() {
	app := iris.New()

	app.HandleDir("/", "./public")

	//拦截所有的请求
	app.Use(func(ctx iris.Context) {

		s := session.IrisSession().Start(ctx)
		userid := s.GetStringDefault("userid",0)
		role := s.GetIntDefault("role",0)

		ctx.Values().Save("userid",uint(userid),true)
		ctx.Values().Save("role",role,true)
		ctx.Next()
	})

	v1:=app.Party("/api/v1"){
		v1.Post("/user/reg", Reg)
		v1.Post("/user/login", Login)
	}

	v2:=app.Party("/api/v2",func(ctx iris.Context){
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 1{
			ctx.JSON(model.NewResult(nil, false, "请登录"))
		}else{
			ctx.Next()
		}		
	}){
		app.Get("/userdetail/{id32}", GetUserDetail)
		app.Post("/userdetail/save/{id32}", SaveUserDetail)
	}

	v3:=app.Party("/api/v3",func(ctx iris.Context){
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 2{
			ctx.JSON(model.NewResult(nil, false, "无权限"))
		}else{
			ctx.Next()
		}	
	}){

	}

	v4:=app.Party("/api/v4",func(ctx iris.Context){
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 3{
			ctx.JSON(model.NewResult(nil, false, "无权限"))
		}else{
			ctx.Next()
		}	
	}){

	}


	// app.Post("api/user/reg", func(ctx iris.Context) {

	// 	configValue := configService.Get("ywbTest")
	// 	ctx.WriteString("value:" + configValue)
	// })

	//ctx.JSON(iris.Map{"message": "Hello Iris!"})


	// Handle the post request from the upload_form.html to the server
	app.Post("api/uploadlifephoto", iris.LimitRequestBodySize(maxSize+1<<20), func(ctx iris.Context) {
		fmt.Println("upload life phone")
		// Get the file from the request.
		file, info, err := ctx.FormFile("uploadfile")
		if err != nil {
			ctx.JSON(model.NewResult(nil, false, "文件上传"+err.Error()))
			return
		}

		defer file.Close()

		u, _ := url.Parse("https://bxc-1300253269.cos.ap-chengdu.myqcloud.com")
		b := &cos.BaseURL{BucketURL: u}
		c := cos.NewClient(b, &http.Client{
			Transport: &cos.AuthorizationTransport{
				SecretID:  "AKIDeAQUO4GmkRvGOGpTmwpW6QXQ4TdaD6ap",
				SecretKey: "GZhaDFeqr42lERVO1OXDfrrCMIyTjkVQ",
			},
		})
		name := "lifephoto/" + string(md5.New().Sum(nil))

		opt := &cos.ObjectPutOptions{
			ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
				ContentType: info.Header["Content-Type"][0],
			},
			ACLHeaderOptions: &cos.ACLHeaderOptions{
				XCosACL: "public-read",
			},
		}
		_, errPut := c.Object.Put(context.Background(), name, file, opt)
		if errPut != nil {
			ctx.JSON(model.NewResult(nil, false, "文件上传"+errPut.Error()))
			return
			// panic(err)
		}
		ctx.JSON(model.NewResult(nil, true, "https://bxc-1300253269.cos.ap-chengdu.myqcloud.com/"+name))
		// 2.Put object by local file path
		// _, err = c.Object.PutFromFile(context.Background(), name, "./test", nil)
		// if err != nil {
		//     panic(err)
		// }

	})

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
		s := session.IrisSession().Start(ctx)
		s.Set("userid", string(user.ID))
		s.Set("role", user.Role)
		ctx.JSON(model.NewResult(user, true, "登录成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}
func GetUserDetail(ctx iris.Context) {	
	userID :=ctx.Values().GetUint("userid")
	if err == nil {
		userDetail, _ := userService.GetUserDetailById(userID)
		ctx.JSON(model.NewResult(userDetail, true, ""))
		return
	}
	ctx.JSON(model.NewResult(nil, false, "用户信息不存在"))

}
func SaveUserDetail(ctx iris.Context) {
	userID :=ctx.Values().GetUint("userid")
	var userDetail model.UserDetail
	err := ctx.ReadJSON(&userDetail)
		
	if err == nil {
		user, _ := userService.GetById(userDetail.UserID)
		if userDetail.UserID != userID {
			ctx.JSON(model.NewResult(nil, false, "非法操作"))
			return
		}

		if user.Gender != userDetail.Gender {
			user.Gender = userDetail.Gender
			userService.Save(user)
		}		

		userService.SaveDetail(userDetail)
		ctx.JSON(model.NewResult(nil, true, "操作成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}
