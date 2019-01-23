#!/bin/bash

# Try to execute the creator -> start npx, wait 15s and check the exit code
timeout 15 npx .

# TODO: Test the console output

# It should be 124 (timeout has passed)
if [[ $? -eq 124 ]]; then
	exit 0
else
	exit 1
fi