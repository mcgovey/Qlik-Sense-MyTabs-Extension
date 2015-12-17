define( ['qlik','ng!$q','underscore'], function (qlik, $q, _) {
    'use strict';

    var app = qlik.currApp();

	var getSheetListFormatted = function () { 
 		var defer = $q.defer();
 		app.getAppObjectList( function ( data ) { 
 			var sheets = {}; 
 			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) { 
 				return item.qData.rank; 
 			} );
 			_.each( sortedData, function ( item ) {
 				var sheetTitle = 'sheet'+item.qInfo.qId;

 				var innerObj = {
						type: "items",
						label: item.qMeta.title,
						items: {
							enabled: {
								ref : "buttons.isEnabled",
								label : "Show this Sheet",
								type : "boolean",
								defaultValue : true
							}
						}
					};

 				sheets[sheetTitle]=innerObj;
 			} );
 			return defer.resolve( sheets ); 
 		} ); 
 		return defer.promise; 
	};

	var altSheetList = {
		component: "expandable-items",
		label: "Sheet Configuration",
		items: function () {
			return getSheetListFormatted().then( function ( items ) {
				return items;
			} );
		}
	};

    return {
        type: "items",
        component: "accordion",
        items: {
            appearance: {
                uses: "settings"
            },
            behavior: altSheetList
        }
    };
});