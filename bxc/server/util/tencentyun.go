package util

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"../conf"
	"github.com/tencentyun/cos-go-sdk-v5"
)

var TencentYun = &tencentyun{}

type tencentyun struct{}

func (yun *tencentyun) Put(name, contentType string, file io.Reader) (bool, error) {
	u, _ := url.Parse("https://bxc-1300253269.cos.ap-chengdu.myqcloud.com")
	b := &cos.BaseURL{BucketURL: u}
	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  conf.Sysconfig.SecretID,
			SecretKey: conf.Sysconfig.SecretKey,
		},
	})

	fmt.Println("name:" + name)
	opt := &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: contentType,
		},
		ACLHeaderOptions: &cos.ACLHeaderOptions{
			XCosACL: "public-read",
		},
	}
	_, errPut := c.Object.Put(context.Background(), name, file, opt)
	if errPut != nil {

		// ctx.JSON(model.NewResult(nil, false, "文件上传"+errPut.Error()))
		return false, errPut
		// panic(err)
	}
	return true, nil
}

func (yun *tencentyun) Delete(name string) bool {
	// 将<BucketName-APPID>和<region>修改为真实的信息
	// 例如：http://examplebucket-1250000000.cos.ap-guangzhou.myqcloud.com
	u, _ := url.Parse("http://bxc-1300253269.cos.ap-chengdu.myqcloud.com")
	b := &cos.BaseURL{BucketURL: u}
	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  conf.Sysconfig.SecretID,
			SecretKey: conf.Sysconfig.SecretKey,
		},
	})

	_, err := c.Object.Delete(context.Background(), name)
	if err != nil {
		return false
	}
	return true
}
