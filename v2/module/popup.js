define(['jquery', 'jquery-ui'], function($, $UI) {

	function Popup() {
		
		this.cfg = {
			width: 300, // 弹窗的默认样式
			height: 200,
			y: 50,
			title: '系统消息', // 弹窗的标题
			msg: 'Hello!', // 弹窗的文字
			handler: null, // 点击按钮后弹窗的回调函数
			hasMask: true, // 是否有遮罩背景
			isDraggable: false // 是否可拖动（使用 jQueryUI 提供的 API）
		}
	}

	Popup.prototype = {
		
		alert: function(cfg) {

			// cfg：拼接传入的配置和默认配置
			var CFG = $.extend(this.cfg, cfg)

			var $boundingBox = $(
				'<div class="bounding-box">'
				+ '<div class="title">' + CFG.title + '</div>'
				+ '<div class="content">' + CFG.msg + '</div>'
				+ '<button>确定</button>'
				+ '</div>'
				)
			$boundingBox.appendTo('body')

			// 添加 mask 遮罩背景
			var $mask = null
			if (CFG.hasMask) {
				$mask = $('<div class="mask"></div>').appendTo('body')
			}

			// 添加可拖动功能
			if (CFG.isDraggable) {
				$boundingBox.draggable()
			}

			var $btn = $boundingBox.find('button')
			$btn.on('click', function() {
				CFG.handler && CFG.handler() // 如果传递了 handler 参数则执行
				$boundingBox.remove()
				$mask && $mask.remove()
			})

			$boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			})

		}
	}

	// 暴露出接口
	return {
		Popup: Popup
	}

})
