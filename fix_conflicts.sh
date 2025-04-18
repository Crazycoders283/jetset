#!/bin/bash

echo "Finding files with merge conflicts..."
# Find all files with merge conflict markers
FILES_WITH_CONFLICTS=$(grep -l -r "<<<<<<< HEAD" --include="*.jsx" --include="*.js" --include="*.css" --include="*.json" .)

# Print the list of files with conflicts
echo "Files with merge conflicts:"
for file in $FILES_WITH_CONFLICTS; do
  echo "- $file"
done

echo "To manually resolve conflicts, edit each file and remove the conflict markers."
echo "Conflict markers look like:"
echo "<<<<<<< HEAD"
echo "your changes"
echo "======="
echo "their changes"
echo ">>>>>>> commit-hash" 