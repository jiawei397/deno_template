#!/bin/bash
deno run --allow-net --allow-env --allow-write --allow-read --importmap import_map.json --unstable mod.ts
