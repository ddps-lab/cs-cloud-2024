#!/bin/bash

customer_directory="/home/cloudshell-user/cs-cloud-2024/s3_customer"
employee_directory="/home/cloudshell-user/cs-cloud-2024/s3_employee"

echo "Enter the API URL of customer: "
read customer_api

cd "$customer_directory"

for file in *.html; do
    backup_file="${file}.backup"
    if [ -f "$backup_file" ]; then
        cp "$backup_file" "$file"
    fi
    cp "$file" "$backup_file"
    sed -i "s|YOUR_API_URL|$customer_api|g" "$file"
done

echo "Enter the API URL of employee: "
read employee_api

cd "$employee_directory"

for file in *.html; do
    backup_file="${file}.backup"
    if [ -f "$backup_file" ]; then
        cp "$backup_file" "$file"
    fi
    cp "$file" "$backup_file"
    sed -i "s|YOUR_API_URL|$employee_api|g" "$file"
done
