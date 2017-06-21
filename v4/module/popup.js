define(['module/widget', 'jquery', 'jquery-ui'], function(widget, $, $UI) {

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

	// 在这里使用 jQuery 的 $.extend 继承 Widget 类上面的方法
	Popup.prototype = $.extend({}, new widget.Widget(), {
		
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

			var _this = this

			var $btn = $boundingBox.find('button')
			$btn.on('click', function() {
				$boundingBox.remove()
				$mask && $mask.remove()

				// 通过观察者模式执行事件
				_this.fire('alert')
			})

			// 通过配置传入的回调事件
			if (CFG.handler) {
				this.on('alert', CFG.handler)
			}

			$boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			})

			// 连缀支持
			return this

		}
	})

	// 暴露出接口
	return {
		Popup: Popup
	}

})
