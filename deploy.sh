#!/bin/sh

FILE=`find build -name *.apk|head -n 1`
curl -F "status=2" -F "notify=1" -F "ipa=@$FILE" -H "X-HockeyAppToken: $HOCKEY_APP_TOKEN" https://rink.hockeyapp.net/api/2/apps/upload
