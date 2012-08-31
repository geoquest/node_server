#!/bin/sh
npm run-script coverage
w3m -dump build/coverage.html