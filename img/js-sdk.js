window.miniApp = {
    // 路由跳转
    navigateTo: function(options, callback) {
        window.miniApp.navigateToCallback = callback;
        window.webkit.messageHandlers.navigateTo.postMessage(options);
    },
    navigateBack: function(callback) {
        window.miniApp.navigateBackCallback = callback;
        window.webkit.messageHandlers.navigateBack.postMessage({});
    },
    // 原生组件
    showMap: function(options, callback) {
        window.miniApp.showMapCallback = callback;
        window.webkit.messageHandlers.showMap.postMessage(options);
    },
    // 缓存
    getCacheData: function(key, callback) {
        window.miniApp.getCacheDataCallback = callback;
        window.webkit.messageHandlers.getCacheData.postMessage({key: key});
    },
    // 视频组件
    playVideo: function(options, callback) {
        window.miniApp.playVideoCallback = callback;
        window.webkit.messageHandlers.playVideo.postMessage(options);
    },
    onVideoStateChanged: function(res) {}, // 视频状态变化
    onVideoProgress: function(res) {},     // 视频进度变化
    // 回调函数（原生调用JS）
    navigateToCallback: function(res) {},
    navigateBackCallback: function(res) {},
    showMapCallback: function(res) {},
    getCacheDataCallback: function(res) {},
    onMapAnnotationClick: function(res) {}, // 地图标注点击
    onPause: function() {}, // 生命周期-暂停
    onResume: function() {}, // 生命周期-恢复
    onDestroy: function() {} // 生命周期-销毁
};
