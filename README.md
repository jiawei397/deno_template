# deno

## 安装denon

```
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

## 运行

```
deno run --allow-net --allow-env --allow-write --allow-read --config tsconfig.json --unstable mod.ts

# 或者直接用-A开启所有权限
deno run -A mod.ts

# 或者使用demon
denon dev
```

## 锁定依赖

```
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
deno fmt
```

## 打包

```
deno bundle mod.ts mod.js

deno compile --unstable mod.ts
```

或者使用denon：

```
denon build
```

运行打包后的结果：

```
denon dist
```
