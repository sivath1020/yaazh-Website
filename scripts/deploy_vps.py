import os
import tarfile
import paramiko

# 1. Create tar.gz of dist
print("Creating dist.tar.gz...")
with tarfile.open("dist.tar.gz", "w:gz") as tar:
    for root, dirs, files in os.walk("dist"):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, "dist")
            tar.add(full_path, arcname=rel_path)

tar_sz = os.path.getsize("dist.tar.gz")
print(f"dist.tar.gz created: {tar_sz/1024/1024:.2f} MB")

# 2. Connect to VPS
vps_host = os.environ.get("VPS_HOST")
vps_user = os.environ.get("VPS_USER")
vps_password = os.environ.get("VPS_PASSWORD")

if (not vps_host or not vps_password) and os.path.exists(".env.local"):
    with open(".env.local") as f:
        for line in f:
            line = line.strip()
            if line.startswith("VPS_HOST=") and not vps_host:
                vps_host = line.split("=", 1)[1]
            elif line.startswith("VPS_USER=") and not vps_user:
                vps_user = line.split("=", 1)[1]
            elif line.startswith("VPS_PASSWORD=") and not vps_password:
                vps_password = line.split("=", 1)[1]

vps_host = vps_host or "93.127.195.80"
vps_user = vps_user or "root"

if not vps_password:
    raise ValueError("VPS_PASSWORD environment variable or .env.local entry is required")

print(f"Connecting to VPS {vps_host}...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(vps_host, username=vps_user, password=vps_password, timeout=20)
sftp = ssh.open_sftp()

# 3. Upload tar.gz
print("Uploading dist.tar.gz to /tmp/...")
sftp.put("dist.tar.gz", "/tmp/dist.tar.gz")
sftp.close()

# 4. Define complete updated Nginx configuration
nginx_conf = """server {
    server_name yaazh360digitech.in www.yaazh360digitech.in 93.127.195.80 _;

    # Canonical 301 Redirect: WWW to non-WWW for SEO consolidation
    if ($host = www.yaazh360digitech.in) {
        return 301 https://yaazh360digitech.in$request_uri;
    }

    root /var/www/yaazh360;
    index index.html;

    client_max_body_size 50M;

    # Security Headers for SEO, Browser Hardening & Screaming Frog Compliance
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:;" always;

    # SEO Canonical Redirects
    location = /index.html { return 301 /$is_args$args; }
    location = / {
        try_files /index.html =404;
        add_header Cache-Control "public, max-age=0, must-revalidate";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:;" always;
    }
    location ~ ^/brochures?/?$ { return 301 /services$is_args$args; }
    location ~ ^/partners/?$ { return 301 /$is_args$args; }
    location ~ ^/(services|about|work|contact|careers|digital-marketing-company-coimbatore|website-development-coimbatore|software-development-coimbatore)\\.html$ {
        return 301 /$1$is_args$args;
    }
    location ~ ^/(services|about|work|contact|careers|digital-marketing-company-coimbatore|website-development-coimbatore|software-development-coimbatore)/+$ {
        return 301 /$1$is_args$args;
    }

    # Search Engine Crawler Entry Files
    location = /robots.txt {
        default_type text/plain;
        try_files $uri =404;
    }
    location = /sitemap.xml {
        default_type application/xml;
        try_files $uri =404;
    }

    # Static Asset Performance Caching
    location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff|woff2|webp)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:;" always;
    }

    # Pre-rendered Page Routing with Clean Fallback
    location / {
        try_files $uri $uri.html $uri/ =404;
        add_header Cache-Control "public, max-age=0, must-revalidate";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:;" always;
    }

    error_page 404 /404.html;
    location = /404.html { internal; }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/yaazh360digitech.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/yaazh360digitech.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:;" always;

    if ($host = www.yaazh360digitech.in) {
        return 301 https://yaazh360digitech.in$request_uri;
    }

    if ($host = yaazh360digitech.in) {
        return 301 https://yaazh360digitech.in$request_uri;
    }

    listen 80 default_server;
    listen [::]:80 default_server;
    server_name yaazh360digitech.in www.yaazh360digitech.in 93.127.195.80 _;
    return 301 https://yaazh360digitech.in$request_uri;
}
"""

print("Writing updated Nginx configuration...")
sftp = ssh.open_sftp()
with sftp.open("/etc/nginx/sites-available/yaazh360", "w") as f:
    f.write(nginx_conf)
sftp.close()

# 5. Extract dist to /var/www/yaazh360/ and reload Nginx
commands = [
    "rm -rf /var/www/yaazh360/assets",
    "tar -xzf /tmp/dist.tar.gz -C /var/www/yaazh360/",
    "rm -f /tmp/dist.tar.gz",
    "chown -R www-data:www-data /var/www/yaazh360",
    "chmod -R 755 /var/www/yaazh360",
    "nginx -t",
    "systemctl reload nginx"
]

for cmd in commands:
    print(f"Running: {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode("utf-8")
    err = stderr.read().decode("utf-8")
    if out: print("OUT:", out.strip())
    if err: print("ERR:", err.strip())

ssh.close()
if os.path.exists("dist.tar.gz"):
    os.remove("dist.tar.gz")
print("Deployment complete!")
