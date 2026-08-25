uv
参考链接：https://www.apframework.com/blog/essay/2025-06-07-Python-UV
下载，通过下面的命令安装uv，uv会被安装到pip所在的环境中
pip install uv
安装后通过下面的命令检查脚本的位置
(base) PS C:\Users\ww> where.exe pip
D:\devtools\Miniconda\miniconda3-py312_25.1.1-2\miniconda3\Scripts\pip.exe
(base) PS C:\Users\ww> where.exe uv
D:\devtools\Miniconda\miniconda3-py312_25.1.1-2\miniconda3\Scripts\uv.exe
查看版本
uv --version
设置uv的缓存，默认缓存目录为C盘
在C:\Users\ww\AppData\Roaming\uv 目录下新建uv.toml文件
写入cache-dir = "F:\\AppData\\Local\\uv\\cache" 并保存
在控制台输入命令
uv cache dir
即可查看缓存目录，来验证是否修改成功

新版uv设置uv缓存策略
在PowerShell中设置
$env:UV_CACHE_DIR = "D:\uv_cache"   # 改成你想要的路径
初始化新项目
# 创建一个新的Python项目目录
uv init example
# 运行正确会显示：Initialized project `example` at `/路径/example`

#只运行uv init --no-workspace就可以将当前项目初始化，而不会创建项目目录

如果直接执行uv init可能会报错：
如果报错error: Failed to discover parent workspace; use `uv init --no-workspace` to ignore
说明uv init 命令尝试在你的项目目录中寻找已有的工作区配置（pyproject.toml），但发现该文件格式不完整或缺少必要的 project 配置表，导致无法自动关联到父工作区。
此时
创建好项目后，会自动在这个项目文件夹下生成如下的文件结构
.
├── .git
├── .gitignore
├── .python-version
├── README.md
├── main.py
└── pyproject.toml

【注】此时.python-version中指定的python版本是默认值，可以在这进行更改

创建虚拟环境
初始化一个新的虚拟环境： uv venv [虚拟环境目录(默认为.venv)] 
# To specify the location of the Python interpreter, use the following command.
# If you are using the Python interpreter from the system environment variables, you can directly use `uv venv [virtual environment directory (default is .venv)]`
uv venv --python C:/Python310/python.exe [虚拟环境名 (默认是 .venv)] # Windows系统
uv venv --python 3.10   #不指定python的路径，直接指定版本，会自己查询可用的符合要求的python解释器
# 激活虚拟环境
.venv\Scripts\activate
# 检查python版本
python --version # 此时python版本为虚拟环境中的python版本

# 退出虚拟环境
deactivate 此时再次检查python版本，会发现python版本为环境变量中的版本
直接接运行 main.py 也可以创建虚拟环境
激活虚拟环境
# 在windows系统中激活虚拟环境
.venv\Scripts\activate
# 在macOS/Linux系统中激活虚拟环境
source .venv/bin/activate

激活后前面会有一个（ClipTrain）
(ClipTrain) (TraeAI-4) D:\myproject\pyProject\AITrainProject\ClipTrain [1:1]
设置镜像
# winodws系统命令行执行
set UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
添加依赖
使用 uv add 命令可以向项目添加依赖。该命令会自动更新 pyproject.toml 文件、锁文件和项目环境：
# 添加单个包
uv add requests

# 指定版本约束
uv add 'requests==2.31.0'

# 添加 Git 依赖
uv add git+https://github.com/psf/requests

# 从 requirements.txt 文件添加所有依赖
uv add -r requirements.txt -c constraints.txt

删除依赖
使用 uv remove 命令可以删除项目依赖：
# 删除包
uv remove requests

安装项目依赖
当你有一个包含 pyproject.toml 的项目时，可以使用以下命令安装所有依赖：
# 安装项目依赖
uv pip install -e .

# 安装包含开发依赖
uv pip install -e ".[dev]"
同步项目环境
使用 uv sync 命令可以确保项目环境与锁文件保持同步
# 同步项目环境
uv sync
uv sync 的底层执行过程：
1. Python 版本选择：
  ○ uv 会按照以下优先级查找 Python 版本：
    ⅰ. 项目配置（如 pyproject.toml 中的 [tool.uv].python 或 .python-version 文件）
    ⅱ. 环境变量 UV_PYTHON
    ⅲ. 系统默认 Python（PATH 中找到的第一个）
1. 虚拟环境处理：
  ○ 如果 不存在 .venv 目录：创建新虚拟环境
  ○ 如果 已存在 .venv 目录：
    ■ 检查现有环境使用的 Python 版本
    ■ 如果与要使用的版本一致：保留环境，只更新依赖
    ■ 如果与要使用的版本不一致：删除现有环境，创建新环境
2. 依赖安装：
  ○ 读取 pyproject.toml 或 requirements.txt
  ○ 解析并安装依赖包到虚拟环境
运行项目命令
uv run 命令可以在项目环境中运行脚本或命令。在每次运行前，UV 会验证锁文件是否与 pyproject.toml 同步，并确保环境与锁文件一致：
# 运行 Python 脚本
uv run main.py
构建项目分发包
uv build 命令可用于构建项目的源码分发包和二进制分发包（wheel）：
# 构建项目
uv build

# 查看构建结果
ls dist/
# 输出示例：
# Successfully built dist/example-0.1.0.tar.gz
# Successfully built dist/example-0.1.0-py3-none-any.whl

uvx 命令可以在不安装工具的情况下直接运行工具：
原理：这个命令会在你的系统临时目录（比如 /tmp 或 %TEMP%）中，瞬间创建一个全新的、隔离的 Python 虚拟环境，然后，uv 在这个临时虚拟环境中，快速安装你指定的工具及其所有依赖，工具安装完成后，uv 立刻在这个临时环境中运行它，命令执行完成后，uv 会默认自动删除这个临时虚拟环境。你的系统全局 Python 环境，或者你项目的工作目录，都没有被污染，没有任何包被永久安装。
uvx 是 uv tool run 的便捷别名。使用 uvx 运行的工具会在临时的隔离环境中安装和运行。