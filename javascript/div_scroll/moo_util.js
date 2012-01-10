
var ScrollBase = new Class({

	_timerWait:	null,
	_timerScroll:	null,
	_objBox:	null,
	_arrList:	[],
	_arrContent:	[],
	_contentIndex:	0,
	_contentLength:	0,
	_pausePos:	0,
	_isScrolling:	false,

	// properties:
	_property:	{'stop_time':2000, 'scroll_speed':50, 'line_height':20},


	initialize:	function(boxId, arrContent) {

				this._objBox		= $(boxId);

				this._arrContent	= arrContent;
				this._contentLength	= this._arrContent.length;

				this._objBox.innerHTML	= '';


				for (var i = 0; i < 2; i++) {

					this._arrList[i]	= new Element('div', {
											'id':'scroll_list_' + i,
											'html':this._arrContent[i],
											'class':'class_' + i
											});

					this._objBox.grab(this._arrList[i]);

				}

				this._objBox.grab(new Element('div', {html:'&nbsp;<br />&nbsp;<br />&nbsp;'}));

				// add event
				this._objBox.addEvent('mouseover', this.pause.bind(this));
				this._objBox.addEvent('mouseout', this.resume.bind(this));


			},

	set:		function(option) {
				for (var strKey in option) {
					this._property[strKey]	= option[strKey];
				}
			},

	play:		function() {

				this._objBox.scrollTop	= 0;	// A 行置顶

				var __THIS__		= this;

				this._timerWait		= setTimeout(function() {
								__THIS__.scroll(__THIS__._property['line_height']);
							}, this._property['stop_time']);

				// 设置 2 行各自要显示的内容
				this._arrList[1].innerHTML	= this._arrContent[this.getNextIndex()];

			},

	next:		function() {

				// 清空[scroll]计时器
				if (this._timerScroll) {
					clearInterval(this._timerScroll);
				}

				this.addIndex();

				// 设置 2 行各自要显示的内容
				this._arrList[0].innerHTML	= this._arrContent[this._contentIndex];

				this.play();		// A 行置顶

			},

	getNextIndex:	function() {
				return (this._contentIndex < (this._contentLength - 1)) ?
					(this._contentIndex + 1) : 0;
			},

	addIndex:	function() {
				return	this._contentIndex = this.getNextIndex();
			},

	scroll:		function(lineHeight) {

				if (lineHeight > 0) {
				} else {
					lineHeight	= this._property['line_height'];
				}

				var __THIS__		= this;

				if (this._timerScroll) {
					clearInterval(this._timerScroll);
				}

				this._timerScroll	= setInterval(function() {

								if (lineHeight > 0) {
									lineHeight--;
									__THIS__._pausePos		= lineHeight;

									__THIS__._objBox.scrollTop	+= 1;

								} else {

									// 滚动结束，进入下一步
									__THIS__.next();
								}

							}, this._property['scroll_speed']);

			},

	pause:		function() {
					clearInterval(this._timerScroll);
					clearTimeout(this._timerWait);
			},

	resume:		function() {
					this.scroll(this._pausePos);
			}


});

