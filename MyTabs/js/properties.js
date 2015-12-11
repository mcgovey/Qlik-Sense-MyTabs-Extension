define( [], function () {
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
	var markerColor = {
        ref : "props.section3.markerColor",
        label : "Change marker color",
        type : "string",
        defaultValue: "#000000",
        component: "dropdown"
    };
    //----------final properties creation---------------
    return {
    		uses : "settings",
			type : "items",
			component : "accordion",
			items : {
				buttons : buttonProps,

			    sheets: {
			        type: "expandable-items",
			        label: "Sheets",
			        items: {
						header3: {
                            type: "items",
                            label: "Marker",
                            items: {
                                markerColor:            markerColor
                            }
                        }
			        }
			    }
			}
		};
});