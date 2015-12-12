define( ["qlik"], function (qlik) {
    'use strict';
	var buttonProps = {
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
	};
	var enabledButton = {
		ref : "buttons.isEnabled",
		label : "Show this Sheet",
		type : "boolean",
		defaultValue : true
	};
	var markerColor = {
        ref : "props.section3.markerColor",
        label : "Change marker color",
        type : "string",
        defaultValue: "#000000",
        component: "dropdown"
    };
    //----------final properties creation---------------

var sheetPropVar = "";
var app = qlik.currApp();

app.getAppObjectList( 'sheet', function(reply){
	console.log("inside func",sheetPropVar);
	//for each sheet in the workbook, create a definition object
	$.each(reply.qAppObjectList.qItems, function(key, value) {
		if(key!==0){
			sheetPropVar+=', ';
		}
		window.sheetPropVar += 'sheet'+key+':{\
						type: "items",\
						label: "'+value.qData.title+'",\
						items: {\
							enabled: {\
								ref : "buttons.isEnabled",\
								label : "Show this Sheet",\
								type : "boolean",\
								defaultValue : true\
							}\
						}}';
	});
});

console.log("outside func",$(sheetPropVar));

    return {
        type: "items",
        component: "accordion",
        items: {
            appearance: {
                uses: "settings"
            },
            buttons : buttonProps,
            configuration : {
                    component: "expandable-items",
                    label: "Sheet Configuration",
                    items: sheetPropVar
      //               {
						// sheet0:{
						// type: "items",
						// label: "TabUno",
						// items: {
						// 	enabled: {
						// 		ref : "buttons.isEnabled",
						// 		label : "Show this Sheet",
						// 		type : "boolean",
						// 		defaultValue : true
						// 	}
						// }}
      //               }
            }
        }
    };
});