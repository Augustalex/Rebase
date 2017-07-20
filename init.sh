#!/usr/bin/env bash
echo "hello"
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

serverCmd="node server/server.js"
appCmd="node apps/terrain/app.js"
gameCmd="npm start"

gnome-terminal --tab -e "bash -c \"${serverCmd}; exec bash\"" --tab -e "bash -c \"${appCmd}; exec bash\" --tab -e " --tab -e "bash -c \"${gameCmd}; exec bash\""
