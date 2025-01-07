# doh-cf-workers
在worker上部署dns，项目分叉serverless-dns/serverless-dns，添加了验证功能，防止其他人使用。

# 部署index.js到cf
注意部署前请在index.js中配置好const AUTH_TOKEN = 'XXXX'添加验证
测试:
```cmd
curl.exe -v -k "https://yourUrl/dns-query?token=AUTH_TOKEN&dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB" -H "accept: application/dns-message"
```
部署后请使用自己的域名

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/maolaohei/doh-cf-workers)

