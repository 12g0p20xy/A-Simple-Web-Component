require.config({
	paths: {
		// 这里可以手动添加文件名和模块名的映射关系
		'jquery': 'module/jquery.min',
		'jquery-ui': 'https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min'
	}
})

// 加载 jQuery 、jQueryUI、 popup 模块
require(['jquery', 'jquery-ui', 'module/popup'], function($, $UI, popup) {
	$('#btn').on('click', function() {
		// 使用 popup
		new popup.Popup().alert({
			msg: 'Welcome!',
			title: '弹窗v2',
			isDraggable: true
		})
	});
})
