#!/bin/bash

# Script to repeatedly attempt git push, canceling after 5 seconds each time

echo "Starting git push retry loop (5 second intervals)..."
echo "Press Ctrl+C to stop"

while true; do
    echo ""
    echo "[$(date '+%H:%M:%S')] Attempting git push..."
    
    # Start git push in background and capture PID
    git push &
    PUSH_PID=$!
    
    # Wait 5 seconds
    sleep 5
    
    # Check if the process is still running and kill it
    if ps -p $PUSH_PID > /dev/null 2>&1; then
        echo "[$(date '+%H:%M:%S')] Push still running, canceling..."
        kill $PUSH_PID 2>/dev/null
        wait $PUSH_PID 2>/dev/null
        echo "[$(date '+%H:%M:%S')] Push canceled"
    else
        echo "[$(date '+%H:%M:%S')] Push completed or failed"
        # Check exit status if available
        wait $PUSH_PID 2>/dev/null
        EXIT_CODE=$?
        if [ $EXIT_CODE -eq 0 ]; then
            echo "[$(date '+%H:%M:%S')] Push succeeded! Exiting."
            break
        fi
    fi
    
    # Small delay before next attempt
    sleep 1
done

