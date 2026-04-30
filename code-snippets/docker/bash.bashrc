# создаёт и запускает контейнер из образа
docker run nginx

# пробрасывает порты localhost:8080 → контейнер:80
docker run -p 8080:80 nginx 

# запустить все сервисы -d в фоне
docker compose up -d
# остановить и удалить контейнеры
docker compose down


# список запущенных процессов
docker ps

# выполняет команду внутри контейнера (зайти в контейнер)
docker exec -it container_name bash
# запускает mysql внутри контейнера mysql_db
docker exec -it mysql_db mysql -u user -p


# скачивает образ из registry. Под капотом разворачивает короткое имя nginx в docker.io/library/nginx:latest
docker pull nginx

# собрать образ из Dockerfile (-t имя образа) в текущей папке
docker build -t my-app .

# список образов
docker images
# удаляет образ
docker rmi image_name

# Сохраняет образ my-app в файл image.tar
docker save -o image.tar my-app

# загружает образ из файла
docker load -i image.tar

# подробная информация (JSON)
docker inspect nginx
# слои докера
docker history nginx

# запустить контейнер
docker start container_name
# остановить контейнер 
docker stop container_name
# удалить контейнер
docker rm container_name