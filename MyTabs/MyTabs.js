/*global define */

define(["jquery",
//mashup and extension interface
"qlik"], function($, qlik) {
	function createBtn(cmd, text) {
		return '<button class="qirby-button" style="font-size:13px;" data-cmd="' + cmd + '">' + text + '</button>';
	}

	return {
		initialProperties : {
			version : 1.0,
			qBookmarkListDef : {
				qType : "bookmark",
				qData : {
					title : "/title",
					description : "/description"
				}
			},
			qFieldListDef : {
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				buttons : {
					type : "items",
					label : "App buttons",
					items : {
					//Toggle button to create buttons
						tabs : {
							ref : "buttons.tabs",
							label : "Show Tab Names",
							type : "boolean",
							defaultValue : false
						}
					}
				},
				settings : {
					uses : "settings"
				}
			}
		},
		paint : function($element, layout) {
			$element.css('overflow', 'auto');
			//create the app button group
			var html = '', app = qlik.currApp();
			html += '<div class="qirby-buttongroup">';
			
			//Create button for show tabs
			if(layout.buttons.tabs) {
				html += createBtn("tabs", "Show Tabs");
			}
			
			//Write to html
			$element.html(html);
			//
			var $fields = $element.find("#fields"), $bookmarks = $element.find("#bookmark_list");




			$element.find('button').on('qv-activate', function() {
				switch($(this).data('cmd')) {
					//Alert tab names
					case 'tabs':
					  	app.getAppObjectList( 'sheet', function(reply){
							var str = "";
							$.each(reply.qAppObjectList.qItems, function(key, value) {
								str +=  value.qData.title + ' ';
								// $.each(value.qData.cells, function(k,v){
								// 	str +=  v.name + ' ';
								// });
							});
							alert(str);
						});
						break;
				}
			});

		}
	};
});