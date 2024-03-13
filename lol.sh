#!/bin/bash
function hello {
        local HELLO=$(ipconfig getifaddr en0)
        local env_var="export const hostname='$HELLO'"
        local path=constants/hostname.ts

        isInFile=$(cat $path | grep -c "$HELLO")

        if [ $isInFile -eq 0 ]; then
                #string not contained in file
                echo "Hostname mach not found. Setting a new one..."
                echo "$env_var" > $path
                echo "New hostname set: $env_var"

        else
                #string is in file at least once
                echo "hostname found, no need to set a new one"
        fi
}
hello
