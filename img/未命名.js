/**
 * 加载动画工具类
 * 提供类方法：show() 显示加载动画，hide() 隐藏加载动画
 * 自动处理 DOM 生成与销毁，避免重复创建
 */
class Loading {
    // 私有静态属性：存储加载动画容器 DOM 实例
    static #container = null;

    // 私有静态方法：创建加载动画 DOM 结构
    static #createElement() {
        // 避免重复创建
        if (this.#container) return;

        // 1. 创建容器元素
        const container = document.createElement('div');
        container.className = 'loading-container';
        container.id = 'loadingContainer';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* 确保在最上层 */
            background: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
        `;

        // 2. 创建 spinner 动画元素
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.cssText = `
            width: 36px;
            height: 36px;
            border: 3px solid rgba(0, 122, 255, 0.3);
            border-top-color: #007AFF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 12px;
        `;

        // 3. 创建文本元素
        const text = document.createElement('div');
        text.className = 'loading-text';
        text.style.cssText = `
            font-size: 14px;
            color: #666;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
        text.textContent = '加载中...';

        // 4. 添加动画样式（避免依赖外部 CSS）
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;

        // 5. 组装元素
        container.appendChild(spinner);
        container.appendChild(text);
        document.head.appendChild(style);
        document.body.appendChild(container);

        // 存储容器引用
        this.#container = container;
    }

    // 公有静态方法：显示加载动画
    static show(text = '加载中...') {
        // 确保 DOM 已创建
        this.#createElement();
        // 更新文本（支持自定义提示文字）
        this.#container.querySelector('.loading-text').textContent = text;
        // 显示动画（防止被意外隐藏）
        this.#container.style.display = 'flex';
    }

    // 公有静态方法：隐藏加载动画
    static hide() {
        if (this.#container) {
            this.#container.style.display = 'none';
        }
    }
}

// 暴露全局变量，方便其他脚本调用
window.Loading = Loading;
