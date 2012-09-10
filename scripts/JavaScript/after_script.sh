#!/bin/sh
npm run-script coverage
perl scripts/filter_source.pl build/coverage.html > build/coverage_filtered.html
w3m -dump build/coverage_filtered.html