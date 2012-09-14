#!/bin/sh
pwd
node node_modules/mocha/bin/mocha --recursive --reporter xunit tests > build/xunit.xml