/*global define */

define(["jquery",
//mashup and extension interface
"qlik"], function($, qlik) {
	function createBtn(cmd, text) {
		return '<button class="qirby-button" style="font-size:13px;" data-cmd="' + cmd + '">' + text + '</button>';
	}

	function render ( $elem, layout ) {
			$elem.css('overflow', 'auto');


		    // Chart object width
		    var width = $elem.width();
		    // Chart object height
		    var height = $elem.height();
		    // Chart object id
		    var id = "container_" + layout.qInfo.qId;
		 
		    // Check to see if the chart element has already been created
		    if (document.getElementById(id)) {
		        // if it has been created, empty it's contents so we can redraw it
		        $("#" + id).empty();
		    }
		    else {
		        // if it hasn't been created, create it with the appropiate id and size
		        $elem.append($('<div />;').attr("id", id).width(width).height(height));
		    }
			
			//create the app button group
			var html = '', app = qlik.currApp();

			html += '<div class="allTabs">';

			// //Create button for show tabs
			// if(layout.buttons.tabs) {
			// 	html += createBtn("tabs", "Show Tabs");
			// }
			
			//Write to html
			//
			// var $fields = $element.find("#fields"), $bookmarks = $element.find("#bookmark_list");




			//$element.find('button').on('qv-activate', function() {
				// switch($(this).data('cmd')) {
				// 	//Alert tab names
				// 	case 'tabs':
					  	
					  	app.getAppObjectList( 'sheet', function(reply){
							//var str = "";
							$.each(reply.qAppObjectList.qItems, function(key, value) {
								html += '<div class="singleTab">';
								html +=  value.qData.title + ' ';
								html += '</div>';
								// $.each(value.qData.cells, function(k,v){
								// 	str +=  v.name + ' ';
								// });
							});
							console.log('inner:'+html);
							// $element.html(html);
							$("#" + id).html(html);
							//return str;
						});
							 // console.log('outerfunc:'+tab);
							 console.log('outer:'+html);
				// 		break;
				// }
			// });
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
		resize: function ( $element, layout ) {
			render( $element, layout );
		},
		paint: function ( $element, layout ) {
			render( $element, layout );
		}
	};
});