FROM dk.uino.cn/library/denoland-deno:alpine-1.37.0

EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

USER deno

COPY . .

# ENV DENO_DIR=deno-dir
ENV DENO_ENV=production
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
ENV NO_COLOR=true
RUN deno cache --vendor --unstable mod.ts

CMD deno run --allow-sys --allow-net --allow-env --allow-write --allow-read  --unstable --vendor mod.ts