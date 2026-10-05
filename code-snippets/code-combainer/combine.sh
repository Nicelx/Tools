#!/bin/bash

# локация результата
OUTPUT="local/docs/combined.txt"
# локация путей
PATHS_FILE="local/docs/paths.txt"

> "$OUTPUT"

add_file() {
    local file="$1"

    echo -e "\n\n===== FILE: $file =====\n" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"

    echo "[OK] $file"
}

while IFS= read -r path; do

    # пропускаем пустые строки и комментарии
    [[ -z "$path" || "$path" =~ ^[[:space:]]*# ]] && continue

    if [ -f "$path" ]; then
        add_file "$path"

    elif [ -d "$path" ]; then
        echo "[DIR] $path"

        while IFS= read -r file; do
            add_file "$file"
        done < <(find "$path" -type f | sort)

    else
        echo "[MISSING] $path"
    fi

done < "$PATHS_FILE"