#!/bin/bash

echo "Finding files with merge conflicts..."
# Find all files with merge conflict markers
FILES_WITH_CONFLICTS=$(grep -l -r "<<<<<<< HEAD" --include="*.jsx" --include="*.js" --include="*.css" --include="*.json" .)

# Counter for fixed files
FIXED_COUNT=0

for file in $FILES_WITH_CONFLICTS; do
  echo "Fixing $file..."
  
  # Create a temp file
  TEMP_FILE=$(mktemp)
  
  # Process the file line by line
  IN_CONFLICT=0
  while IFS= read -r line; do
    if [[ "$line" == *"<<<<<<< HEAD"* ]]; then
      # Start of conflict - we want to keep this version
      IN_CONFLICT=1
      continue
    elif [[ "$line" == *"======="* ]] && [ $IN_CONFLICT -eq 1 ]; then
      # Middle of conflict - skip everything after this until end marker
      IN_CONFLICT=2
      continue
    elif [[ "$line" == *">>>>>>>"* ]] && [ $IN_CONFLICT -eq 2 ]; then
      # End of conflict - stop skipping
      IN_CONFLICT=0
      continue
    fi
    
    # Only write lines that are not in the "skip" section
    if [ $IN_CONFLICT -ne 2 ]; then
      echo "$line" >> "$TEMP_FILE"
    fi
  done < "$file"
  
  # Replace the original file with our fixed version
  mv "$TEMP_FILE" "$file"
  
  FIXED_COUNT=$((FIXED_COUNT+1))
done

echo "$FIXED_COUNT files have been fixed." 