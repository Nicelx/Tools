
# 1) останавливаем процессы 

systemctl stop nginx
systemctl stop httpd
systemctl stop php-fpm (this can be tricky)

# 2) бэкапим файлы
tar -czvf backupname.tar /home/bitrix/www/pathtosite (or with -cf flag - is enough)

# 3) mysql backup 
mysqldump -u root --single-transaction dbname > dbfilename.sql

# 3.5) запускаем всё обратно

systemctl start nginx
systemctl start httpd
systemctl start php-fpm

# 4) распаковываем файлы 
tar -xvf site2.tar -C site2 --strip-components=1 (распаковывает архив site2.tar в папку site2 и убирает 1 уровень)

# 5) ставим права bitrix для папки site2 (для битрикса)
chown -R bitrix:bitrix site2

# 6) создаём бд и пользователя бд под которым будем коннектиться и даём ему права
mysql -u root -e "
CREATE DATABASE mydbname
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
"
mysql -u root -e "CREATE USER 'site2_user'@'localhost' IDENTIFIED BY 'anypassword';"
mysql -u root -e "GRANT ALL PRIVILEGES ON mydbname.* TO 'site2_user'@'localhost';
FLUSH PRIVILEGES;"

# 7) грузим бд 
mysql -u root site2 < site2.sql  (импортирует site2.sql в базу данных site2)

# 8) коннектим бд к сайту .settings.php, dbconn.php or in other places
