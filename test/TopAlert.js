
class TopAlert {
  constructor() {
    // 创建背景遮罩层
    this.background = this.createBackground();
    
    // 创建alert主容器
    this.container = this.createContainer();
    this.titleEl = this.createTitleElement();
    this.messageEl = this.createMessageElement();
    // 新增分隔线元素
    this.separator = this.createSeparator();
    this.buttonsContainer = this.createButtonsContainer();
    this.confirmBtn = this.createButton('确定', 'confirm');
    this.cancelBtn = this.createButton('取消', 'cancel');
    
    // 组装元素结构（添加分隔线）
    this.buttonsContainer.appendChild(this.cancelBtn);
    this.buttonsContainer.appendChild(this.confirmBtn);
    this.container.appendChild(this.titleEl);
    this.container.appendChild(this.messageEl);
    this.container.appendChild(this.separator); // 添加分隔线
    this.container.appendChild(this.buttonsContainer);
    
    // 插入到页面中
    document.body.appendChild(this.background);
    this.background.appendChild(this.container);

    // 绑定事件
    this.bindEvents();
    
    // 存储回调
    this.confirmCallback = null;
    this.cancelCallback = null;
  }

    // 新增：创建分隔线
  createSeparator() {
    const separator = document.createElement('div');
    separator.className = 'top-alert-separator';
    // 使用与按钮间相同的分隔线样式
    separator.style.cssText = `
      height: 0.5px;
      background-color: #E5E5EA;
      width: 100%;
    `;
    return separator;
  }
  
  // 创建背景层（保持不变）
  createBackground() {
    const background = document.createElement('div');
    background.className = 'top-alert-background';
    background.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999998;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      overflow-x: auto;
    `;
    background.innerHTML = `<div style="width: 101%; height: 100%;"></div>`

    return background;
  }
  
  // 创建alert容器（调整为iOS风格）
  createContainer() {
    const container = document.createElement('div');
    container.className = 'top-alert-container';
    container.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      z-index: 999999;
      width: 85%; /* iOS 弹窗更宽 */
      max-width: 270px; /* iOS 原生弹窗最大宽度 */
      background: #fff;
      border-radius: 13px; /* iOS 圆角更大 */
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); /* 更柔和的阴影 */
      overflow: hidden;
      opacity: 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* 更快的动画 */
      pointer-events: none;
      box-sizing: border-box;
    `;
    return container;
  }
  
  // 新增：创建标题元素
  createTitleElement() {
    const title = document.createElement('div');
    title.className = 'top-alert-title';
    title.style.cssText = `
      padding: 24px 24px 8px; /* 标题与消息间距 */
      font-size: 17px; /* iOS 标题字体大小 */
      font-weight: 600; /* 加粗标题 */
      color: #000; /* 标题深色 */
      text-align: center;
    `;
    return title;
  }
  
  // 创建消息元素（保持原有样式）
  createMessageElement() {
    const message = document.createElement('div');
    message.className = 'top-alert-message';
    message.style.cssText = `
      padding: 8px 24px 24px; /* 调整上下内边距 */
      font-size: 16px;
      color: #333;
      line-height: 1.6;
      text-align: center;
    `;
    return message;
  }
  
  // 创建按钮容器（调整为iOS风格）
  createButtonsContainer() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'top-alert-buttons';
    buttonsContainer.style.cssText = `
      display: flex;
      height: 44px; /* iOS 按钮固定高度 */
    `;
    return buttonsContainer;
  }
  
  // 创建按钮（调整为iOS风格）
  createButton(text, type) {
    const button = document.createElement('button');
    button.className = `top-alert-btn top-alert-${type}-btn`;
    button.textContent = text;
    
    const baseStyle = `
      flex: 1;
      height: 100%; /* 占满容器高度 */
      border: none;
      font-size: 17px; /* iOS 按钮字体大小 */
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent; /* 移除点击高亮 */
    `;
    
    if (type === 'confirm') {
      // 确认按钮：非蓝色，使用深色文字
      button.style.cssText = baseStyle + `
        background-color: transparent;
        color: #007AFF; /* iOS 确认按钮标准蓝色 */
      `;
    } else {
      // 取消按钮：灰色文字
      button.style.cssText = baseStyle + `
        background-color: transparent;
        color: #777; /* iOS 取消按钮灰色 */
        border-right: 0.5px solid #E5E5EA; /* 更细的分割线 */
      `;
    }
    
    return button;
  }
  
  // 绑定事件（保持不变）
  bindEvents() {
    // 确定按钮事件
    this.confirmBtn.addEventListener('click', () => {
      this.hide();
      if (typeof this.confirmCallback === 'function') {
        this.confirmCallback();
      }
    });
    
    // 取消按钮事件
    this.cancelBtn.addEventListener('click', () => {
      this.hide();
      if (typeof this.cancelCallback === 'function') {
        this.cancelCallback();
      }
    });
    
    // 点击背景不关闭弹窗
    this.background.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 阻止背景滚动
    this.background.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
  }
  
  // 显示alert（新增标题参数）
  show(options) {
    const {
      title, // 新增标题参数
      message,
      onConfirm,
      onCancel,
      confirmText,
      cancelText
    } = options || {};
    
    // 设置内容
    this.titleEl.textContent = title || ''; // 设置标题
    this.messageEl.innerHTML = message || '';
    if (confirmText) this.confirmBtn.textContent = confirmText;
    if (cancelText) this.cancelBtn.textContent = cancelText;
    
    // 存储回调
    this.confirmCallback = onConfirm;
    this.cancelCallback = onCancel;
    
    // 显示动画
    setTimeout(() => {
      this.background.style.opacity = '1';
      this.background.style.pointerEvents = 'auto';
      
      this.container.style.transform = 'translate(-50%, -50%) scale(1)';
      this.container.style.opacity = '1';
      this.container.style.pointerEvents = 'auto';
    }, 10);
  }
  
  // 隐藏alert（保持不变）
  hide() {
    this.background.style.opacity = '0';
    this.background.style.pointerEvents = 'none';
    
    this.container.style.transform = 'translate(-50%, -50%) scale(0.9)';
    this.container.style.opacity = '0';
    this.container.style.pointerEvents = 'none';
    
    setTimeout(() => {
      this.confirmCallback = null;
      this.cancelCallback = null;
    }, 300);
  }
}

// 使用示例（带标题）
// const alert = new TopAlert();
// alert.show({
//   title: '提示', // 新增标题
//   message: '这是一个iOS风格的提示框',
//   onConfirm: () => {
//     console.log('用户点击了确定');
//   },
//   onCancel: () => {
//     console.log('用户点击了取消');
//   }
// });
