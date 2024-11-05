# Bob 豆包翻译插件

这是一个 [Bob](https://ripperhe.gitee.io/bob/) 的翻译插件，使用豆包 AI 的接口进行翻译。

## 功能特点

- 支持多种语言之间的互译
- 使用豆包 AI 大模型进行翻译
- 支持自动语言检测

## 支持的语言

- 中文 (zh)
- 英语 (en)
- 日语 (ja)
- 韩语 (ko)
- 法语 (fr)
- 德语 (de)
- 西班牙语 (es)
- 意大利语 (it)
- 俄语 (ru)
- 葡萄牙语 (pt)
- 荷兰语 (nl)
- 波兰语 (pl)
- 阿拉伯语 (ar)
- 越南语 (vi)
- 泰语 (th)

## 安装

1. 安装 [Bob](https://ripperhe.gitee.io/bob/) (版本 >= 0.5.0)
2. 下载插件: [豆包翻译插件](https://github.com/你的用户名/bob-plugin-doubaiai-translate/releases)
3. 双击下载的 `.bobplugin` 文件进行安装

## 打包插件

如果你想自己修改代码并打包插件，可以按照以下步骤进行：

1. 进入 `src` 目录：
   ```bash
   cd src
   ```

2. 在 `src` 目录下执行以下命令：
   ```bash
   zip -r doubaiai-translate.bobplugin *
   ```

3. 计算打包文件的 SHA256 值：
   ```bash
   shasum -a 256 doubaiai-translate.bobplugin
   ```

4. 更新 `appcast.json` 中的 SHA256 值。

## 配置

1. 注册 [豆包 AI](https://www.doubao.com/) 账号
2. 获取 API Key 和 Bot ID
3. 在 Bob 的设置中，找到豆包翻译插件，填入 API Key 和 Bot ID

## 开发者

如果你想自己修改代码，可以按照以下步骤进行开发：

1. 克隆项目
   ```bash
   git clone https://github.com/你的用户名/bob-plugin-doubaiai-translate.git
   ```

2. 开发和调试
3. 打包插件
   ```bash
   cd src
   zip -r doubaiai-translate.bobplugin *
   ```

## 注意事项

- 请确保你的 API Key 和 Bot ID 正确配置
- 翻译服务可能会产生费用，请查看豆包 AI 的计费规则
- 如遇到问题，请检查 Bob 的调试日志

## 许可证

MIT License

## 感谢

- [Bob](https://ripperhe.gitee.io/bob/)
- [豆包 AI](https://www.doubao.com/)