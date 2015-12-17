define( [
	'qlik',
	'ng!$q',
	'underscore'
	], function (qlik, $q, _) {
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

    var app = qlik.currApp();
	var getSheetList = function () { 

 		var defer = $q.defer();

 		app.getAppObjectList( function ( data ) { 
 			var sheets = []; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			// console.log(sortedData);
 			_.each( sortedData, function ( item ) { 
 				sheets.push( { 
 					value: item.qInfo.qId, 
 					label: item.qMeta.title 
 				} ); 
 			} );
 			// console.log(sheets);
 			return defer.resolve( sheets ); 
 		} ); 

 		return defer.promise; 
	};

	var sheetList = {
		type: "string",
		component: "dropdown",
		label: "Select Sheet",
		ref: "props.sheets",
		options: function () {
			return getSheetList().then( function ( items ) {
				console.log('innerItems', items);
				return items;
			} );
		}
	};
	console.log('sheetList', sheetList);

	var altSheetList = {
		item1: function () {
			return getSheetList().then( function ( items ) {
				var innerList = {
						type: "string",
						component: "dropdown",
						label: "Select Sheet",
						ref: "props.sheets3",
						options: items
					};
				console.log('items:', innerList);
				return innerList;
			} );
		}
	};
	console.log('altSheetList', altSheetList);
         
      //               items: //sheetPropVar
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

    //----------final properties creation---------------
    return {
        type: "items",
        component: "accordion",
        items: {
            appearance: {
                uses: "settings"
            },
            buttons : buttonProps,
            behavior: {
				type: "items",
				label: "Sheet Configuration",
				items: {
					sheetList: sheetList,
					altSheetList: altSheetList
				}
			},
            configuration : {
                    component: "expandable-items",
                    label: "Sheet Configuration Old",
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