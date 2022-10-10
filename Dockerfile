FROM dk.uion.cn/deno/deno:alpine-1.26.1

EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

ADD . .

ENV DENO_DIR=deno-dir

RUN deno cache --import-map import_map_proxy.json --unstable mod.ts

CMD deno run --allow-net --allow-env --allow-write --allow-read --importmap import_map_proxy.json --unstable mod.ts
