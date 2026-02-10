

# activate package manager
corepack enable
corepack prepare yarn@stable --activate


# create empty file
touch /etc/nginx/default.conf


# install snap (repository kind of thing)
apt install -y snapd

# certbot
# install certbot
snap install --classic certbot
# nginx usage example
certbot --nginx -d example.com -d www.example.com

# download install.sh and print it in console
wget -qO- https://raw.githubusercontent.com/.../install.sh