require.config({
	paths: {
		// 这里可以手动添加文件名和模块名的映射关系
		jquery: 'module/jquery.min'
	}
})

// 加载 jQuery 和 popup 模块
require(['jquery', 'module/popup'], function($, popup) {
	$('#btn').on('click', function() {
		// 使用 popup
		new popup.Popup().alert({
			msg: 'Welcome!',
			handler: function() {
				alert('You clicked the button!')
			}
		})
	});
})
