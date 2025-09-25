// 国际化性能测试
console.log("🚀 开始测试国际化加载性能...");

const startTime = performance.now();

// 模拟页面加载
document.addEventListener("DOMContentLoaded", () => {
  const domLoadTime = performance.now();
  console.log(`📄 DOM 加载时间: ${(domLoadTime - startTime).toFixed(2)}ms`);
});

// 模拟首次内容绘制
window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`🎨 页面加载时间: ${(loadTime - startTime).toFixed(2)}ms`);

  // 检查翻译文件大小
  const moduleSize = Object.keys(window.__NEXT_DATA__ || {}).length;
  console.log(`📦 初始模块数量: ${moduleSize}`);
});

export {};
