# AdviceByte

## Documentation 
```
  https://www.notion.so/Intro-to-myDose-c22a58d92702443591020d98a837b80b
 ```

## Installation (On RHEL7/CENTOS7)

 - `sudo setenforce Permissive`
 - `sudo yum install git`
 - `sudo yum install -y yum-utils`
 - `sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`
   - if error occur `sudo vim /etc/yum.repos.d/docker-ce.repo` change the `baseurl` for `docker-ce-stable` to `https://download.docker.com/linux/centos/7/$basearch/stable `
 - `sudo yum install docker-ce docker-ce-cli containerd.io`
 - `sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose`
 - `sudo chmod +x /usr/bin/docker-compose`
 - `sudo systemctl start docker`
 - `git clone https://github.com/Ponny035/AdviceByte-Alpha.git /usr/share/nginx/html/app && cd /usr/share/nginx/html/app`
 - `curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -`
 - `sudo yum install -y nodejs`
 - `sudo npm i pm2@latest -g`
 - `cd /usr/share/nginx/html/app/sql && sudo docker-compose up -d`
 - `cd /usr/share/nginx/html/app && pm2 start pm2.json`
 - `npm i`
 - Edit .env.production with `VUE_APP_APIURI="http://ip_address/api"`
 - `npm build`
 - `sudo yum install nginx`
 - `sudo chown -R nginx:nginx /usr/share/nginx/html/app/`
 - `sudo vim /etc/nginx/nginx.conf`
 ```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include /etc/nginx/conf.d/*.conf;
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html/app/dist;
        include /etc/nginx/default.d/*.conf;
        location / {
            index index.html;
            try_files $uri $uri/ /index.html;
        }
        location /api/ {
            proxy_pass http://127.0.0.1:3000/;
        }
    }
}
```
- `sudo systemctl restart nginx`
