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


	// var getSheetList = function () { 

 // 		var defer = $q.defer();

 		app.getAppObjectList( function ( data ) { 
 			var sheets = []; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			_.each( sortedData, function ( item ) {
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
 			// return defer.resolve( sheets ); 
 			console.log('sheets1',JSON.stringify(sheets));
 		} ); 
 		// return defer.promise; 
	// };



 		app.getAppObjectList( function ( data ) { 
 			var sheets = []; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			_.each( sortedData, function ( item ) {
 				var sheetTitle = 'sheet'+item.qInfo.qId;

 				var innerObj = {
						type: "items",
						label: item.qMeta.title,
						items: {
							enabledObj: {
								ref : "buttons.isEnabled",
								label : "Show this Sheet",
								type : "boolean",
								defaultValue : true
							}
						}
					};

 				var foo = {};
 				foo[sheetTitle]=innerObj;

 				sheets.push( foo );

 			} );
 			console.log('sheets2',JSON.stringify(sheets[0]));
 		} ); 

	var getSheetListFormatted = function () { 

 		var defer = $q.defer();

 		app.getAppObjectList( function ( data ) { 
 			var sheets = []; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			_.each( sortedData, function ( item ) {
 				var sheetTitle = 'sheet'+item.qInfo.qId;

 				var innerObj = {
						type: "items",
						label: item.qMeta.title,
						items: {
							enabledObj: {
								ref : "buttons.isEnabled",
								label : "Show this Sheet",
								type : "boolean",
								defaultValue : true
							}
						}
					};

 				var foo = {};
 				foo[sheetTitle]=innerObj;

 				sheets.push( foo );

 			} );
 			return defer.resolve( sheets ); 
 		} ); 

 		return defer.promise; 
	};

	var altSheetList = {
		// type: "items",
		component: "expandable-items",
		label: "Sheet Configuration",
		items: function () {
			return getSheetListFormatted().then( function ( items ) {
				console.log('this is called');
				return items[0];
			} );
		}
	};
	// console.log('altSheetList', altSheetList);

    //----------final properties creation---------------
    return {
        type: "items",
        component: "accordion",
        items: {
            appearance: {
                uses: "settings"
            },
            buttons : buttonProps,
            behavior: altSheetList,
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