# deno_template

[![deno version](https://img.shields.io/badge/deno-^1.19.0-green?logo=deno)](https://github.com/denoland/deno)

## 安装插件

### 安装denon

```
deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts
```

具体api详见[官方](https://deno.land/x/denon)

### 安装git hook

先使用git初始化项目。

```
git init
git add .
git commit -m "feat: init"
```

再安装git hook:

```
deno run --allow-write https://deno.land/x/jw_cli@v0.3.0/cli/git_hook.ts
```

这样每次commit提交就会触发`deno lint`。

### vscode开启deno插件

在应用商店查找`deno`插件，安装使用。

本工程默认启用[`import maps`](https://deno.land/manual@v1.6.0/linking_to_external_code/import_maps)功能。

## 运行

```
deno run --allow-net --allow-env --allow-write --allow-read --importmap import_map.json --config tsconfig.json --unstable mod.ts

# 或者直接用-A开启所有权限
deno run -A --importmap import_map.json --unstable mod.ts

# 推荐使用demon
denon dev
```

## 锁定依赖

使用`lock.json`来保障依赖，所以当`import_map.json`的内容或版本号修改后，需要执行`denon cache`，再重启服务。

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

```bash
deno bundle mod.ts mod.js

deno bundle main.ts | esbuild --minify > main.min.js

deno compile --unstable mod.ts
```

或者使用`denon`：

```bash
denon build
```

运行打包后的结果：

```bash
denon dist
```

## 发布到gitlab

我们通过打标签的方式，跑CICD进行发布，建议安装以下命令：

```bash
deno install --allow-read --allow-write --allow-run --unstable -n deno_tag -f https://deno.land/x/jw_cli@v0.3.0/cli/tag/mod.ts
```

然后在项目根目录下执行`patch/minor/major`进行版本号的变更，逻辑与`nodejs`的`npm version`命令一致，它会更新`scripts.yml`文件中版本号。

```bash
deno_tag patch -L
deno_tag minor -L
deno_tag major -L
```

## 生成git日志文件

```
npm install -g conventional-changelog-cli
cd my-project
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

如果只是添加：

```
conventional-changelog -p angular -i CHANGELOG.md -s
```

安装后，以后推荐在本工程执行：

```
denon log
```
