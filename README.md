# deno_template

[![deno version](https://img.shields.io/badge/deno-^1.37.0-green?logo=deno)](https://github.com/denoland/deno)

## 安装插件

在当前工程执行：

```bash
deno run  --allow-write https://deno.land/x/jw_cli@v0.5.0/cli/git_hook.ts
```

## vscode开启deno插件

在应用商店查找`deno`插件，安装使用。

## 运行

```bash
deno task dev
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

## 发布到gitlab

我们通过打标签的方式，跑CI/CD进行发布，建议安装以下命令：

```bash
deno install --allow-read --allow-write --allow-run --unstable -n tag -f https://deno.land/x/jw_cli@v0.5.0/cli/tag/mod.ts
```

然后在项目根目录下执行`patch/minor/major`进行版本号的变更，逻辑与`Node.js`的`npm version`命令一致，它会更新`deno.jsonc`文件中版本号。

```bash
tag patch -L
tag minor -L
tag major -L
```

## 生成git日志文件

```bash
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

如果只是添加：

```bash
conventional-changelog -p angular -i CHANGELOG.md -s
```

现使用`deno task log`来调用上述命令。
