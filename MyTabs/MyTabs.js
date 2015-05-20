/*global define */

define(["jquery",
//mashup and extension interface
"qlik"], function($, qlik) {
	function createBtn(cmd, text) {
		return '<button class="qirby-button" style="font-size:13px;" data-cmd="' + cmd + '">' + text + '</button>';
	}

	function render ( $elem, layout ) {
			//create the app button group
			var html = '', app = qlik.currApp();
			//get app location and path
		    var appName = encodeURIComponent(app.id);
          	var http = location.protocol;
          	var slashes = http.concat("//");
//          	console.log(location.protocol + "//" + window.location.hostname);
          	var hostname = window.location.hostname; //$element[0].ownerDocument.URL;
          	var urlPath = "";
          	if(hostname==="localhost")
            {
              urlPath = slashes + hostname + ":4848/sense/app/" + appName + "/sheet/";
            }
          	else
            {
              urlPath = slashes + hostname + "/sense/app/" + appName + "/sheet/";
            }

            //set css element
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
			

			html += '<div id="allTabs">';
			//get list of tab objects and insert into div
		  	app.getAppObjectList( 'sheet', function(reply){

				$.each(reply.qAppObjectList.qItems, function(key, value) {
					html += '<div class="singleTab">';
					html +=  '<a href="' + urlPath + value.qInfo.qId + '/state/analysis">' + value.qData.title + '</a></li> ';
					html += '</div>';
				});
				console.log('inner:'+html);

				$("#" + id).html(html);

			});

			console.log(Object.getOwnPropertyNames(app));
				 // console.log('outerfunc:'+tab);
				 // console.log('outer:'+html);
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