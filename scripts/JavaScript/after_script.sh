#!/bin/sh
npm run-script coverage
perl scripts/coverage2text.pl build/coverage.html