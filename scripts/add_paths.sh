#!/bin/bash

# Check if an argument is passed, if not exit with an error message
if [ -z "$1" ]; then
  echo "Please provide a target directory."
  exit 1
fi

# Use the first argument as the target directory
TARGET_DIR="$1"

# Check if the directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Directory does not exist: $TARGET_DIR"
  exit 1
fi

# Iterate recursively over all .ts, .tsx, .js, and .jsx files in the directory and its subdirectories
find "$TARGET_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) | while read -r file; do

  # Get the relative path
  relative_path="${file#$TARGET_DIR/}"
  new_comment="// -- $TARGET_DIR/$relative_path"

  # Check if the first line starts with "// --"
  first_line=$(head -n 1 "$file")

  if [[ "$first_line" == "// --"* ]]; then
    # Compare the first line with the new comment
    if [[ "$first_line" == "$new_comment" ]]; then
      echo "Skipped: $file"
      continue
    else
      # Remove the old line (old file path)
      sed -i '1d' "$file"
      echo "Updated: $file"
    fi
  else
    echo "Added: $file"
  fi

  # Insert the new relative path at the top of the file
  tmp_file=$(mktemp)

  # Add the path as a comment at the top of the file
  echo "$new_comment" > "$tmp_file"

  # Append the original content of the file to the temporary file
  cat "$file" >> "$tmp_file"

  # Move the temporary file back to the original file
  mv "$tmp_file" "$file"

done
