# doh-cf-workers
A very minimalist DNS-over-HTTPS proxy on Cloudflare Workers.

# 部署index.js到cf
注意部署前请在index.js中配置好const AUTH_TOKEN = 'XXXX'添加验证
测试:
```cmd
curl.exe -v -k "https://yourUrl/dns-query?token=AUTH_TOKEN&dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB" -H "accept: application/dns-message"
```
部署后请使用自己的域名
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/maolaohei/doh-cf-workers)

Want more control of the filter? Use [serverless-dns](https://github.com/serverless-dns/serverless-dns) which powers [RethinkDNS](https://rethinkdns.com/)

Want to host on Google Cloud Function or see how this is implemented in .NET? Use my [doh-gcf](https://github.com/tina-hello/doh-gcf)
