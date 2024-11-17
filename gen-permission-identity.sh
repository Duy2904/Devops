#!/bin/bash

# Make API request and store the response in a variable
api_response=$(curl -s https://identity-next.tripota.com.vn/api/v1/Resources/permissions)

# Check if the API request was successful
if [ $? -ne 0 ]; then
  echo "Failed to fetch API response."
  exit 1
fi

file="./src/utils/Permissions/IdentityPermissions.ts"  # Specify the path to your JavaScript/TypeScript file
# Check if the file exists
if [ -e "$file" ]; then
  # File exists, so delete it
  rm "$file"
fi

echo "/* eslint-disable no-unused-vars */" >> "$file"
echo "export enum IdentityPermissions {" >> "$file"

# Parse the JSON response using jq (make sure jq is installed)
permissions=$(echo $api_response | jq -r '.[]')

# Print each item in the response
for permission in $permissions; do
  IFS='.' read -ra parts <<< "$permission"
  
  # Join the parts by an underscore and convert to uppercase
  formatted_permission=$(echo "${parts[1]}${parts[2]} = '$permission'")

  # Append the formatted permission line
  echo "  $formatted_permission," >> "$file"
done

echo "}" >> "$file"