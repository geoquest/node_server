#!/bin/sh
# Build script for the jenkins server
pwd
[ -e testreport ] || mkdir testreport
node node_modules/mocha/bin/mocha --recursive --reporter xunit tests > testreport/xunit.xml
jshint --jslint-reporter ServerComponents/ > testreport/jshint.xml || true