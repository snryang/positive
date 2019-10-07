package main

import (
	"fmt"
	"strconv"
	"time"

	"./model"
	"./req"
	"./service"
	"./session"
	"./util"
	"github.com/kataras/iris"
	uuid "github.com/satori/go.uuid"
)

//https://iris-go.com/start/#another-example-query-post-form demo
var configService = service.ConfigService{}
var userService = service.UserService{}
var momentsService = service.MomentsService{}

const maxSize = 4 << 20 // 4MB 图片最大4M

func main() {
	app := iris.New()

	app.HandleDir("/", "./public")

	//拦截所有的请求
	app.Use(func(ctx iris.Context) {
		s := session.IrisSession().Start(ctx)
		userid := s.GetIntDefault("userid", 0)
		role := s.GetIntDefault("role", 0)

		ctx.Values().Save("userid", userid, true)
		ctx.Values().Save("role", role, true)
		ctx.Next()
	})

	v1 := app.Party("/api/v1")
	{
		v1.Post("/user/reg", Reg)
		v1.Post("/user/login", Login)
		v1.Get("/config/{key}", GetConfig)

		v1.Get("/moments/{id}", GetMoments)
		v1.Get("/moments/reply/{id}", GetMomentsReply)
		v1.Post("/moments", SearchMoments)
	}

	v2 := app.Party("/api/v2", func(ctx iris.Context) {
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 1 {
			ctx.JSON(model.NewResult(nil, false, "请登录"))
		} else {
			ctx.Next()
		}
	})
	{
		v2.Get("/userdetail", GetUserDetail)
		v2.Post("/userdetail/save", SaveUserDetail)

		// v2.Post("/userdetail/save", SaveUserDetail)
		// v2.Post("/userdetail/save", SaveUserDetail)

		v2.Get("/lifephoto", GetLifePhoto)
		v2.Post("/uploadlifephoto", iris.LimitRequestBodySize(maxSize+1<<20), UploadLifePhoto)
		v2.Get("/deletelifephoto", DeleteLifePhoto)

		v2.Post("/update/avatar", UpdateAvatar)
		
		v2.Post("/moments/add", AddMoments)
		v2.Post("/moments/reply/add", AddMomentsReply)
	}

	v3 := app.Party("/api/v3", func(ctx iris.Context) {
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 2 {
			ctx.JSON(model.NewResult(nil, false, "无权限"))
		} else {
			ctx.Next()
		}
	})
	{
		v3.Get("/userdetail/{userid}", GetUserDetailByID)
		v3.Post("/userdetail/save", SaveUserDetailV3)
		v3.Get("/lifephoto/{userid}", GetLifePhotoByID)

	}

	v4 := app.Party("/api/v4", func(ctx iris.Context) {
		role := ctx.Values().GetIntDefault("role", 0)
		if role < 3 {
			ctx.JSON(model.NewResult(nil, false, "无权限"))
		} else {
			ctx.Next()
		}
	})
	{
		v4.Post("/config/{key}", SaveConfig)
	}

	// app.Post("api/user/reg", func(ctx iris.Context) {

	// 	configValue := configService.Get("ywbTest")
	// 	ctx.WriteString("value:" + configValue)
	// })

	//ctx.JSON(iris.Map{"message": "Hello Iris!"})

	app.Run(iris.Addr(":8099"))
}

func UpdateAvatar(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")

	file, info, err := ctx.FormFile("uploadfile")
	if err != nil {
		ctx.JSON(model.NewResult(nil, false, "文件上传"+err.Error()))
		return
	}
	defer file.Close()

	name := "avatar/" + uuid.Must(uuid.NewV4()).String()

	_, errPut := util.TencentYun.Put(name, info.Header["Content-Type"][0], file)

	if errPut != nil {
		fmt.Println(errPut)
		ctx.JSON(model.NewResult(nil, false, "文件上传"+errPut.Error()))
		return
	}
	userService.UpdateAvatar(userID, name)
	ctx.JSON(model.NewResult("https://bxc-1300253269.cos.ap-chengdu.myqcloud.com/"+name, true, name))
}

func GetMoments(ctx iris.Context) {
	id := ctx.Params().Get("id")

	moments, err := momentsService.Get(id)
	if err != nil {
		ctx.JSON(model.NewResult(nil, false, "非法参数"))
		return
	}
	ctx.JSON(model.NewResult(moments, true, ""))
}

func GetMomentsReply(ctx iris.Context) {
	id := ctx.Params().Get("id")
	replyList := momentsService.SearchMomentsReply(id, 20000)
	ctx.JSON(model.NewResult(replyList, true, ""))
}

func AddMomentsReply(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
	momentsId := ctx.FormValue("momentsId")
	// toUser := ctx.FormValue("toUser")
	// toUser := ctx.FormValue("toUser")
	text := ctx.FormValueDefault("text", "")

	if userService.AllowAction(userID, "add_reply") == false {
		ctx.JSON(model.NewResult(nil, false, "30秒内只允许回复一次"))
		return
	}
	userService.SetActionTime(userID, "add_reply", 30)
	momentsService.AddReply(&model.MomentsReply{
		MomentsID: momentsId,
		ToUser:    0,
		FromUser:  userID,
		Text:      text})
	ctx.JSON(model.NewResult(nil, true, "发布成功"))
}

func AddMoments(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
	tag := ctx.FormValueDefault("tag", "")
	text := ctx.FormValueDefault("text", "")
	imgNumber := ctx.FormValueDefault("imgNumber", "")
	img := ""
	if userService.AllowAction(userID, "add_moments") == false {
		ctx.JSON(model.NewResult(nil, false, "四小时内只允许发布一次"))
		return
	}
	// fileList := []multipart.File{}
	if imgNumber != "" {
		num, _ := strconv.Atoi(imgNumber)
		for a := 1; a <= num; a++ {
			file, info, err := ctx.FormFile("file" + strconv.Itoa(a))
			if err != nil {
				break
			}
			defer file.Close()
			name := "moments/" + uuid.Must(uuid.NewV4()).String()
			_, errPut := util.TencentYun.Put(name, info.Header["Content-Type"][0], file)
			if errPut != nil {
				break
			}
			img = img + name + ";"
		}
	}

	userService.SetActionTime(userID, "add_moments", 60*60*4)
	momentsService.Add(&model.Moments{
		UserID: userID,
		Tag:    tag,
		Text:   text,
		Img:    img})
	ctx.JSON(model.NewResult(nil, true, "发布成功"))

}

func SearchMoments(ctx iris.Context) {
	// userid, _ := ctx.Params().GetIntUnslashed("userid")
	var req req.Req_search_moments
	err := ctx.ReadJSON(&req)
	if err == nil {

		list := momentsService.SearchMoments(req.MomentsID, req.Created, req.UserID, req.Tag, req.PageSize)

		//TODO 下面方法比较笨，后续修改实现方式
		userids := []int{}
		for _, item := range list {
			userids = append(userids, item.UserID)
		}
		userList := userService.GetUserInfo(userids)
		ctx.JSON(model.NewResult(iris.Map{"moments": list, "users": userList}, true, ""))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}

func GetUserDetailByID(ctx iris.Context) {
	userid, _ := ctx.Params().GetIntUnslashed("userid")
	userDetail, _ := userService.GetUserDetailById(userid)
	ctx.JSON(model.NewResult(userDetail, true, ""))
}

func GetLifePhotoByID(ctx iris.Context) {
	userid, _ := ctx.Params().GetIntUnslashed("userid")
	userLifePhotos := userService.GetUserLifePhoto(userid)
	ctx.JSON(model.NewResult(userLifePhotos, true, ""))
}

func SaveConfig(ctx iris.Context) {
	key := ctx.Params().Get("key")
	value := ctx.FormValue("value")
	configService.Save(key, value)
	ctx.JSON(model.NewResult(nil, true, ""))
}

func GetConfig(ctx iris.Context) {
	key := ctx.Params().Get("key")
	ctx.JSON(model.NewResult(configService.Get(key), true, ""))
}

func GetLifePhoto(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
	userLifePhotos := userService.GetUserLifePhoto(userID)
	ctx.JSON(model.NewResult(userLifePhotos, true, ""))
}

func DeleteLifePhoto(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
	filename := ctx.URLParam("filename")

	userLifePhotos := userService.GetUserLifePhoto(userID)
	exist := false
	for _, item := range userLifePhotos {
		if item.Url == filename {
			exist = true
			break
		}
	}
	if exist {
		userService.RemoveUserLifePhoto(userID, filename)
		util.TencentYun.Delete(filename)
		ctx.JSON(model.NewResult(nil, true, "删除成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "删除照片失败"))
	}
}
func UploadLifePhoto(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")

	userLifePhotos := userService.GetUserLifePhoto(userID)

	if len(userLifePhotos) > 6 {
		ctx.JSON(model.NewResult(nil, false, "最多上传6张生活照片"))
		return
	}

	file, info, err := ctx.FormFile("uploadfile")
	if err != nil {
		ctx.JSON(model.NewResult(nil, false, "文件上传"+err.Error()))
		return
	}
	defer file.Close()

	name := "lifephoto/" + uuid.Must(uuid.NewV4()).String()
	fmt.Println("name:" + name)

	_, errPut := util.TencentYun.Put(name, info.Header["Content-Type"][0], file)

	if errPut != nil {
		fmt.Println(errPut)

		ctx.JSON(model.NewResult(nil, false, "文件上传"+errPut.Error()))
		return
	}
	userService.InsertUserLifePhoto(userID, name)
	ctx.JSON(model.NewResult("https://bxc-1300253269.cos.ap-chengdu.myqcloud.com/"+name, true, name))

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
		invitationCode := configService.Get("InvitationCode")
		if len(invitationCode) > 0 {
			if userRegister.IvitationCode != invitationCode {
				ctx.JSON(model.NewResult(nil, false, "当前开启了邀请码注册，邀请码不正确"))
				return
			}
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
		s.Set("userid", int(user.ID))
		s.Set("role", user.Role)
		ctx.JSON(model.NewResult(user, true, "登录成功"))
	} else {
		ctx.JSON(model.NewResult(nil, false, "非法数据"))
	}
}
func GetUserDetail(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
	if userID > 0 {
		userDetail, _ := userService.GetUserDetailById(userID)
		ctx.JSON(model.NewResult(userDetail, true, ""))
		return
	}
	ctx.JSON(model.NewResult(nil, false, "用户信息不存在"))
}

func SaveUserDetailV3(ctx iris.Context) {
	var userDetail model.UserDetail
	err := ctx.ReadJSON(&userDetail)

	if err == nil {
		user, _ := userService.GetById(userDetail.UserID)

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

func SaveUserDetail(ctx iris.Context) {
	userID, _ := ctx.Values().GetInt("userid")
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
