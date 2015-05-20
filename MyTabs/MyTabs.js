/*global define */

define(["jquery",
	//mashup and extension interface
	"qlik",
	//add stylesheet
	"text!./style.css",
	//load bootstrap files
	"text!./css/bootstrap.min.css",
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
				

				html += '<div id="navbar" class="navbar-collapse collapse">';
				html += '<ul class="nav nav-tabs nav-justified">';
				//get list of tab objects and insert into div
			  	app.getAppObjectList( 'sheet', function(reply){

					$.each(reply.qAppObjectList.qItems, function(key, value) {

						html += '<li>';
						html += '<a href="' + urlPath + value.qInfo.qId + '/state/analysis">';
						html += value.qData.title;
						// html += '<span class="link-spanner"></span>'
						
						html += '</a>';
						html += '</li>';

					});
					// console.log(reply);//.qAppObjectList
					console.log(app);//.qAppObjectList

					console.log(app.model.session.cacheName);//.qAppObjectList

					html += '</ul></div>';
					$("#" + id).html(html);

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