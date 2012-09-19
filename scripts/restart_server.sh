#!/bin/sh
[ -e /tmp/gqns.pid ] && [ -f /proc/`cat /tmp/gqns.pid`/exe ] && kill `cat /tmp/gqns.pid`
rm -rf /var/lib/jenkins/live/geoquest_node_server
mv /var/lib/jenkins/live/geoquest_node_server.pre /var/lib/jenkins/live/geoquest_node_server
cd /var/lib/jenkins/live/geoquest_node_server/ServerComponents
BUILD_ID=
nohup node application.js & echo $! > /tmp/gqns.pid