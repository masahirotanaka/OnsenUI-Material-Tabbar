#!/bin/sh
FILE=`find build -name *.apk`
curl -F "status=2" -F "notify=1" -F "ipa=@{$FILE}" -H "X-HockeyAppToken: $HOCKEY_APP_TOKEN" https://rink.hockeyapp.net/api/2/apps/upload
