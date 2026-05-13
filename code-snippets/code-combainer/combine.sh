#!/bin/bash

OUTPUT="combined.txt"

> "$OUTPUT"

while IFS= read -r file; do

  if [ -f "$file" ]; then
    echo -e "\n\n===== FILE: $file =====\n" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"

    echo "[OK] $file"

  else
    echo "[MISSING] $file"
  fi

done < paths.txt