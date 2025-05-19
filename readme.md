# AI智能体脂秤固件UI原型

## 项目简介
本项目是一个用于展示AI智能体脂秤交互界面的前端原型，模拟了在 **320x240像素横屏** 显示条件下的用户体验。原型包含从设备启动到测量、分析、结果展示以及语音问答的完整流程。通过HTML、CSS (Tailwind CSS) 和JavaScript (结合D3.js) 实现，支持模拟用户交互和动画效果。

## 文件结构
```
├── 01_Boot_Welcome.html       # 启动欢迎界面
├── 02_Idle_Ready.html         # 待机就绪界面
├── 03_Detecting_Weight.html   # 测量中界面
├── 04_User_Selection.html     # 用户选择界面
├── 05_LLM_Analyzing.html      # AI分析中界面
├── 05_Results_Primary.html    # 核心结果展示界面
├── 08_QA_Listening.html       # 问答监听中 (第一轮)
├── 10_Answer_And_Speaking.html # 问答展示&语音播报 (第一轮)
├── 10b_QA_Listening_Round2.html # 问答监听中 (第二轮)
├── 10c_Answer_And_Speaking_Round2.html # 问答展示&语音播报 (第二轮)
├── 12_Error.html              # 错误提示界面
├── 13_Shutdown.html           # 关机界面
├── 14_Low_Battery.html        # 低电量提醒界面
├── index.html                 # 项目目录页
├── css/
│   └── style.css              # 全局样式文件
├── js/
│   ├── 01_boot.js             # 启动逻辑
│   ├── 02_idle.js             # 待机逻辑
│   ├── 03_detect.js           # 测量逻辑
│   ├── 04_select.js           # 用户选择逻辑
│   ├── 04_measure.js          # 测量动画逻辑 (注意: 此文件可能在近期重构中功能有调整或被整合)
│   ├── 05_results.js          # 结果展示逻辑
├── audio/
│   ├── aifxz.MP3              # AI分析音效
│   ├── clz.mp3                # 测量音效
│   ├── fxjg.MP3               # 结果音效
│   ├── kjyx.mp3               # 启动音效
│   ├── qzstzc.MP3             # 待机音效
│   ├── whd.MP3                # 问答音效 (第一轮)
│   ├── whd1.MP3               # 问答音效 (可能用于第一轮或测试)
│   ├── xzyh.MP3               # 用户选择音效 (可能用于用户选择或切换)
│   ├── xzyh2.MP3              # 用户选择音效 (备用或第二版本)
│   ├── zzlt.MP3               # 聆听音效 (可能用于第二轮)
│   ├── zzlt1.MP3              # 聆听音效 (可能用于第一轮)

```
*（音频文件具体用途请参照各HTML页面内的引用）*

## 功能说明
1.  **启动流程**：
    *   显示动态欢迎界面，播放启动音效。
    *   自动跳转到待机界面。

2.  **测量流程**：
    *   模拟体重测量，动态显示测量数据。
    *   支持用户选择界面，自动跳转到AI分析和结果展示。

3.  **语音问答**：
    *   支持两轮语音问答，包含监听和语音播报功能。

4.  **其他状态**：
    *   包含错误提示、关机界面和低电量提醒。

## 使用方法
1.  克隆项目到本地：
    ```bash
    git clone <repository-url>
    ```
2.  打开 `index.html` 文件，使用浏览器查看项目目录。
3.  点击各页面链接，体验完整交互流程。

## 技术栈
-   **HTML5**: 页面结构
-   **CSS3**: 使用 Tailwind CSS 和自定义样式
-   **JavaScript (ES6+)**: 实现交互逻辑和动画效果
-   **D3.js**: 用于动态绘制健康数据趋势图

## 注意事项
-   确保浏览器支持 HTML5 和 ES6。
-   音频文件需在支持的环境下播放（如 Chrome）。
-   项目UI已适配 **320x240像素横屏** 显示。

## 作者
**big Hua**
