package main

import "github.com/kataras/iris"
import "./service"

func main() {
	app := iris.New()

	app.HandleDir("/", "./public")

	app.Get("/get", func(ctx iris.Context) {
		configValue := service.Get("ywbTest")
		ctx.WriteString("value:" + configValue)
	})
	app.Run(iris.Addr(":8080"))
}
