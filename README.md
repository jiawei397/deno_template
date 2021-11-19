# deno_template

[![deno version](https://img.shields.io/badge/deno-^1.13.2-green?logo=deno)](https://github.com/denoland/deno)

## 安装denon

```
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

具体api详见[官方](https://deno.land/x/denon)

## vscode开启deno插件

在应用商店查找`deno`插件，安装使用。

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

也可以直接这样：

```
denon cache
```

## 校验

```shell
deno lint
```

## 格式化

```shell
deno fmt
```

建议开发时，开启`vscode`自动格式化。

## 打包

```
deno bundle mod.ts mod.js

deno bundle main.ts | esbuild --minify > main.min.js

deno compile --unstable mod.ts
```

或者使用`denon`：

```
denon build
```

运行打包后的结果：

```
denon dist
```
