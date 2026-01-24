# LilysToolKits

<div align="center">

![LilysToolKits Logo](https://img.shields.io/badge/LilysToolKits-v0.0.6-blue.svg)
![License](https://img.shields.io/badge/license-GPL%20v3-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**一个轻量级的离线工具集合，提供常用的开发工具和转换器**

[快速开始](#快速开始) • [功能特性](#功能特性) • [使用说明](#使用说明) • [项目结构](#项目结构) • [贡献指南](#贡献指南)

</div>

## 📋 目录

- [关于项目](#-关于项目)
- [功能特性](#-功能特性)
- [快速开始](#-快速开始)
- [使用说明](#-使用说明)
- [项目结构](#-项目结构)
- [技术栈](#-技术栈)
- [贡献指南](#-贡献指南)
- [版本历史](#-版本历史)
- [许可证](#-许可证)
- [联系方式](#-联系方式)

## 🌟 关于项目

LilysToolKits 是一个纯前端的离线工具集合，专为开发者和日常用户设计。它提供了多种实用的转换工具，无需联网即可使用，保护您的数据隐私。

### 设计理念

- 🌐 **离线优先**: 无需网络连接，随时随地使用
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🎨 **简洁界面**: 专注核心功能，无冗余设计
- ⚡ **高性能**: 纯前端实现，响应速度快
- 🔒 **数据安全**: 所有数据处理均在本地完成

## ✨ 功能特性

### 🧮 进制转换器
- 支持十进制、十六进制、二进制之间的相互转换
- 实时转换，输入即显示结果
- 支持大数值转换（最大 2^53-1）
- 内置数字键盘，方便输入

### 🔤 Hex/ASCII转换器
- 十六进制与ASCII码之间的双向转换
- 支持批量字符转换
- 实时预览转换结果
- 字符编码显示

### 💡 光模块计算器
- 光模块相关参数计算
- 功率计算和转换
- 波长计算工具
- 衰减计算功能

## 🚀 快速开始

### 环境要求

- 现代浏览器（Chrome 60+、Firefox 55+、Safari 12+、Edge 79+）
- 无需额外依赖或安装

### 安装使用

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/lilystoolkits-h5.git
   cd lilystoolkits-h5
   ```

2. **直接使用**
   - 直接打开 `index.html` 文件即可开始使用
   - 或使用任何 HTTP 服务器托管整个项目

3. **使用 Live Server（推荐）**
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   
   # 使用 PHP
   php -S localhost:8000
   ```

4. **访问应用**
   在浏览器中访问 `http://localhost:8000`

## 📖 使用说明

### 主界面
- 打开应用后，您将看到三个主要工具的入口
- 点击任意工具卡片即可进入相应的功能页面
- 每个页面都有返回主页的导航链接

### 进制转换器
1. 选择输入数值的进制类型
2. 使用数字键盘或直接键盘输入数值
3. 实时查看其他进制的转换结果
4. 支持 DEL 和 CLR 键进行编辑操作

### Hex/ASCII转换器
1. 在任意输入框中输入内容
2. 另一边会自动显示转换结果
3. 支持特殊字符和 Unicode
4. 提供字符编码参考表

### 光模块计算器
1. 输入已知参数（如功率、波长等）
2. 选择计算类型
3. 自动计算相关参数
4. 提供计算结果和建议值

## 📁 项目结构

```
lilystoolkits-h5/
├── home/                  # 主页
│   ├── index.html         # 主页面
│   ├── style.css         # 通用样式
│   └── main.js          # 主页面逻辑
├── converter/            # 进制转换器
│   ├── converter.html    # 进制转换器页面
│   ├── converter.css    # 进制转换器样式
│   └── converter.js     # 进制转换器逻辑
├── hexascii/            # Hex/ASCII转换器
│   ├── hexascii.html    # Hex/ASCII转换器页面
│   ├── hexascii.css     # Hex/ASCII转换器样式
│   └── hexascii.js      # Hex/ASCII转换器逻辑
├── optical/             # 光模块计算器
│   ├── optical.html     # 光模块计算器页面
│   ├── optical.css     # 光模块计算器样式
│   ├── optical.js      # 光模块计算器逻辑
│   └── echarts.js      # 图表库
├── README.md              # 项目说明文档
├── revision.md            # 版本更新记录
├── CONTRIBUTING.md        # 贡献指南
├── CODE_OF_CONDUCT.md     # 行为准则
├── LICENSE                # 许可证文件
├── .gitignore             # Git忽略文件
└── package.json           # 项目配置文件
```

## 🛠️ 技术栈

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript (ES6+)
- **样式框架**: 自定义 CSS，响应式设计
- **图标**: 内置 SVG 图标
- **构建工具**: 无需构建，开箱即用
- **版本控制**: Git
- **许可证**: GNU GPL v3.0

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是功能建议、bug 报告还是代码提交。

### 如何贡献

1. **Fork 本仓库**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 开发规范

- 遵循现有的代码风格和命名规范
- 添加必要的注释和文档
- 确保在不同浏览器中的兼容性
- 测试新功能在移动设备上的表现

### Bug 报告

在提交 bug 报告时，请包含以下信息：
- 详细的问题描述
- 复现步骤
- 浏览器版本和操作系统
- 相关的错误截图（如果适用）

## 📊 版本历史

### v0.0.6 (2026-01-24)
- 📁 重新组织项目结构，每个工具独立文件夹
- 🔗 更新所有页面间的导航链接
- 📦 方便整体或单独分发小工具
- 🏠 主页移至 home/ 文件夹
- 🧮 converter/ 文件夹包含进制转换器
- 🔤 hexascii/ 文件夹包含 Hex/ASCII 转换器
- 💡 optical/ 文件夹包含光模块计算器

### v0.0.5 (2026-01-24)
- 🔢 统一版本号到 0.0.5
- 📦 更新 package.json 版本号
- 🏠 更新 index.html 中的版本显示
- 📱 更新 README.md 版本徽章

### v0.0.4 (2026-01-24)
- 🏗️ 更新项目结构文档，移除不存在的 assets 目录
- 📦 更新 package.json 信息（版本、邮箱、仓库链接）
- 📋 添加 CONTRIBUTING.md 贡献指南
- 📜 添加 CODE_OF_CONDUCT.md 行为准则
- 🔧 完善 GitHub 最佳实践文件结构

### v0.0.3 (2026-01-24)
- 📧 更新联系邮箱为 lilyy.tong@qq.com
- 🗑️ 移除计划中的功能列表
- 📱 更新版本号到 v0.0.3

### v0.0.2 (2026-01-24)
- 📝 添加完整的 README.md 文档
- 📋 添加 revision.md 版本更新记录
- 🔧 优化项目文档结构

### v0.0.1 (2024-01-24)
- ✨ 初始版本发布
- 🧮 进制转换器功能
- 🔤 Hex/ASCII转换器功能
- 💡 光模块计算器功能
- 📱 响应式设计支持
- 🎨 现代化UI界面

## 📄 许可证

本项目采用 [GNU GPL v3.0](LICENSE) 许可证。

```text
Copyright (C) 2024 Lily's Tool Kits

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

## 📞 联系方式

- **项目主页**: [https://github.com/jinw-yu/lilystoolkits-h5](https://github.com/jinw-yu/lilystoolkits-h5)
- **问题反馈**: [GitHub Issues](https://github.com/jinw-yu/lilystoolkits-h5/issues)
- **邮箱**: lilyy.tong@qq.com

## 🙏 致谢

感谢所有为开源社区做出贡献的开发者们，以及本项目的所有使用者。

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐**

Made with ❤️ by [Lily's Tool Kits](https://github.com/jinw-yu)

</div>