#!/bin/bash

echo "=> Compiling..."
echo ""
rm -rf ./dist
./node_modules/.bin/nwb build
echo ""
echo "=> Complete"
