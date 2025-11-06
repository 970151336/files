const vConsole = new VConsole();
console.log('vConsole 已初始化，现在可以在移动端查看控制台输出了');
console.log('page.js 已初始化，现在可以在移动端查看控制台输出了');
// 获取ID为test的a标签
const link = document.getElementById('test');

// 为链接添加点击事件监听器
link.addEventListener('click', function(event) {
  // 阻止a标签的默认跳转行为
  event.preventDefault();
  openPage(link.href,'page.js');
  // 这里编写你的自定义跳转逻辑
  console.log('默认跳转已拦截889');
});
