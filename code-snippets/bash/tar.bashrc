# tar is build in tool for archives

tar [flags] [archive] [files, folders]

-c  create     создать архив
-x  extract    распаковать
-t  list       показать содержимое
-v  verbose    показать процесс
-f  file       имя архива (ВСЕГДА последним среди флагов)

-z  gzip   быстро, стандарт
-j  bzip2  сильнее, медленнее
-J  xz     максимум сжатия


# make an archive
tar -cvf site.tar site (создаёт архив site.tar из папки site )
tar -cf site.tar site (без вывода в консоль)

# extract
tar -xvf site2.tar (распаковывает архив в папку site2, как правило)

tar -xvf site.tar -C site_unpacked (распаковывает site.tar в папку site_unpacked. Будет site_unpacked/site)
tar -xvf site2.tar -C site_unpacked --strip-components=1 (убирает 1 уровень вложенности при распаковки site_unpacked/содержимое)

# to do describe exludes etc
