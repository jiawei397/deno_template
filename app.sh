#!/bin/bash
deno run --allow-net --allow-env --allow-write --allow-read --lock lock.json --config tsconfig.json --unstable src/main.ts
