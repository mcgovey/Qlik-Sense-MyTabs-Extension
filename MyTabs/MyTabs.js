/*global define */

define(["jquery",
	//mashup and extension interface
	"qlik",
	//add stylesheet
	"text!./style.css",
	//load bootstrap files
	"text!./css/scoped-twbs.min.css",
	"./js/bootstrap.min"
	], 
	function ($, qlik, cssContent, bsCssContent) {

		$( "<style>" ).html( cssContent ).appendTo( "head" );

		$( "<style>" ).html( bsCssContent ).appendTo( "head" );

		function render ( $elem, layout ) {
				//create the app button group
				var html = '', app = qlik.currApp();
				//get app location and path
			    var appName = encodeURIComponent(app.id);
	          	var http = location.protocol;
	          	var slashes = http.concat("//");
	          	var hostname = window.location.hostname;
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
			 
			    // // Check to see if the chart element has already been created
			    // if (document.getElementById(id)) {
			    //     // if it has been created, empty it's contents so we can redraw it
			    //     $("#" + id).empty();
			    // }
			    // else {
			    //     // if it hasn't been created, create it with the appropiate id and size
			    //     $elem.append($('<div />;').attr("id", id).width(width).height(height));
			    // }
				$elem.empty();


				html += '<div id="navbar" class="navbar-collapse collapse twbs">';

				//create a list box of navigation items
				html += '<ul class="nav nav-tabs nav-justified">';
				//get list of tab objects and insert into div
			  	app.getAppObjectList( 'sheet', function(reply){

			  		//for each sheet in the workbook, create a list item
					$.each(reply.qAppObjectList.qItems, function(key, value) {

						//include the sheet id as the list item id to be used as a reference for active sheet
						html += '<li id="' + value.qInfo.qId + '">';//class="active"

						//create a link to each sheet using the url found earlier and the sheet id
						html += '<a href="' + urlPath + value.qInfo.qId + '/state/analysis">';

						//give the link the same name as the sheet
						html += value.qData.title;
						
						html += '</a>';
						html += '</li>';

					});
					// console.log(reply);//.qAppObjectList
					// console.log(app);//.qAppObjectList

					html += '</ul></div>';

					//insert html into the extension object
					$elem.html(html);//$("#" + id).

					//find the location that the current tab is stored
					var cacheName = app.model.session.cacheName;

					if (cacheName.toLowerCase().indexOf("sheet/") >= 0){
						// Add six to position of cacheName to offset the 'sheet/' index from above
						var cacheNameSheetLoc = cacheName.toLowerCase().indexOf("sheet/")+6;
						// find the end position of the sheet
						var cacheNameSheetLocStop = cacheName.indexOf("/",cacheNameSheetLoc);
						//get the active sheet ID
						var activeSheetID = cacheName.substr(cacheNameSheetLoc,cacheNameSheetLocStop-cacheNameSheetLoc);
					}

					//set the attribute for the list box of the active sheet to active
					$('#' + activeSheetID).attr('class','active');

				});
				
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
			definition: {
                type: "items",
                component: "accordion",
                items: {
                    appearance: {
                        uses: "settings"
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