define( ["./sheetList"], function (sheetList) {
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


console.log($scope);
// foo(function(sheetListVar){
	// console.log('var received',sheetList);



	// getValue.then(function(value){console.log('outsidePromiseBeforeReturn',value);});
// });

// console.log("outside func",sheetPropVar);

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
                    items: //sheetPropVar
                    {
						sheet0:{
						type: "items",
						label: "TabUno",
						items: {
							enabled: {
								ref : "buttons.isEnabled",
								label : "Show this Sheet",
								type : "boolean",
								defaultValue : true
							}
						}}
                    }
            }
        }
    };
});