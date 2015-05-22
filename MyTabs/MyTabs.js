/*global define */

define(["jquery",
	//mashup and extension interface
	"qlik",
	//add stylesheet
	"text!./style.css",
	//load bootstrap files
	"text!./css/scoped-twbs.min.css",
	"client.utils/state",
	"client.utils/routing",
	"./js/bootstrap.min"
	], 
	function ($, qlik, cssContent, bsCssContent, clientState, clientRedirect) {
		//apply scoped Bootstrap CSS to header
		$( "<style>" ).html( cssContent ).appendTo( "head" );
		//apply scoped Bootstrap CSS to header
		$( "<style>" ).html( bsCssContent ).appendTo( "head" );

		function redirect (sheetId){
	    	clientRedirect.goToSheet(sheetId, Object.keys(clientState.States)[clientState.state])
		}

		function render ( $elem, layout) {
			//create the app button group
			var html = '', app = qlik.currApp();

			//---- method for redirecting users to different sheet using URL (reloads entire page)
   //			//get app location and path and save to URL global variable
   //			var appName = encodeURIComponent(app.id);
   //        	var http = location.protocol;
   //        	var slashes = http.concat("//");
   //        	var hostname = window.location.hostname;
   //        	var urlPath = "";
   //        	if(hostname==="localhost")
   //          {
   //            urlPath = slashes + hostname + ":4848/sense/app/" + appName + "/sheet/";
   //          }
   //        	else
   //          {
   //            urlPath = slashes + hostname + "/sense/app/" + appName + "/sheet/";
   //          }

            //set css element
			$elem.css('overflow', 'auto');

		    // Chart object width
		    var width = $elem.width();
		    // Chart object height
		    var height = $elem.height();
		    // Chart object id
		    var id = "container_" + layout.qInfo.qId;

			$elem.empty();


			html += '<div id="navbar" class="navbar-collapse collapse twbs ' + id + '">';

			//create a list box of navigation items
			html += '<ul class="nav nav-tabs">';//nav-justified
			//get list of tab objects and insert into div
		  	app.getAppObjectList( 'sheet', function(reply){

		  		//for each sheet in the workbook, create a list item
				$.each(reply.qAppObjectList.qItems, function(key, value) {

					//include the sheet id as the list item id to be used as a reference for active sheet
					html += '<li id="' + value.qInfo.qId + '">';// onClick="redirect(' + value.qInfo.qId + ');

					//wrap anchor tag to be used by bootstrap styling
					html += '<a>';

					//give the link the same name as the sheet
					html += value.qData.title;
					
					html += '</a>';
					html += '</li>';

				});

				html += '</ul></div>';

				//insert html into the extension object
				$elem.html(html);

				//for each sheet in the workbook, attach a click event to point to a different sheet
				$.each(reply.qAppObjectList.qItems, function(key, value) {
					$('div.' + id + ' ul.nav li#'+ value.qInfo.qId).click(function(){
						//clientRedirect.goToSheet(value.qInfo.qId);
						redirect(value.qInfo.qId);
					});
				});

				// ------Method for getting active sheet ID using cache-----

				// //find the location that the current tab is stored
				// var cacheName = app.model.session.cacheName;

				// if (cacheName.toLowerCase().indexOf("sheet/") >= 0){
				// 	// Add six to position of cacheName to offset the 'sheet/' index from above
				// 	var cacheNameSheetLoc = cacheName.toLowerCase().indexOf("sheet/")+6;
				// 	// find the end position of the sheet
				// 	var cacheNameSheetLocStop = cacheName.indexOf("/",cacheNameSheetLoc);
				// 	//get the active sheet ID
				// 	var activeSheetID = cacheName.substr(cacheNameSheetLoc,cacheNameSheetLocStop-cacheNameSheetLoc);
				// }

				//get the active sheet ID
				var activeSheetID = clientState.getModel().id;

				//set the attribute for the list box of the active sheet to active
				$('#' + activeSheetID).attr('class','active');

				//Toggle Tab Justification	
				if(layout.buttons.justified) {
					$('div.' + id + ' ul.nav').toggleClass("nav-justified");
				}
				//Toggle navbar theme to inverted color scheme
				if(layout.buttons.colored){
					$('div.' + id + ' ul.nav').toggleClass("navbar-inverse");
				}

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

		definition : {
			type : "items",
			component : "accordion",
			items : {
				buttons : {
					type : "items",
					label : "Navbar Options",
					items : {
					//create boolean buttons for justification and color theme
						justified : {
							ref : "buttons.justified",
							label : "Fit Tabs Across Full Page",
							type : "boolean",
							defaultValue : false
						},
						colored : {
							ref : "buttons.colored",
							label : "Invert Navigation Theme",
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
		paint: function ( $element, layout) {
			render( $element, layout);
		}
	};
});