# deno模板

## 安装denon

```
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

## 运行

```
deno run --allow-net --allow-env --allow-write --allow-read --config tsconfig.json --unstable src/main.ts

# 或者直接用-A开启所有权限
deno run -A router.ts

# 测试
denon dev
```

## 锁定依赖

```
deno cache --lock=lock.json --lock-write --unstable deps.ts

deno cache --reload --lock=lock.json --unstable deps.ts

deno cache --reload --lock=lock.json --lock-write --unstable deps.ts

deno cache --reload=http://localhost:4507 --lock=lock.json --lock-write --unstable deps.ts
```

新增依赖锁：
```
deno cache --lock=lock.json --lock-write --unstable deps.ts
```

## 格式化

```shell
deno fmt router.ts
```

## 打包

```
deno bundle router.ts index.js

deno compile --unstable router.ts
```
