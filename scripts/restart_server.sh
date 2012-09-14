#!/bin/sh
BUILD_ID=
[ -e /tmp/gqns.pid ]  && kill `cat /tmp/gqns.pid` || true
rm -rf /var/lib/jenkins/live/geoquest_node_server
mv /var/lib/jenkins/live/geoquest_node_server.pre /var/lib/jenkins/live/geoquest_node_server
cd /var/lib/jenkins/live/geoquest_node_server/ServerComponents
nohup node application.js & echo $! > /tmp/gqns.pid