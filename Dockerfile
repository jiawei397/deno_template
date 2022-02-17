FROM denoland/deno:alpine-1.16.2

EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

ADD . .

ENV DENO_DIR=deno-dir

RUN deno cache --import-map import_map.json --config tsconfig.json --unstable mod.ts

CMD deno run --allow-net --allow-env --allow-write --allow-read --importmap import_map.json --config tsconfig.json --unstable mod.ts