var createGetProxy = function(handler)  {
	return Object.create(Proxy.create({
		get: function (rcvr, key) {
			if (['splice', 'constructor', '__proto__'].indexOf(key) != -1) {
				return;
			} else {
				return handler(rcvr, key);
			}
		}
	}));
}

var Repository = function (entities){

	if (!entities || !entities.length) return null;

	var filteredKey,
		filterEntities,
		operatorHandler,
		comparisonOperators = ['==','<','>','!='];

	filterEntities = function (key, operator, comparer) {
		var results = entities.filter(function (entity) {
			switch (operator) {
			  case "==": return entity[filteredKey] == comparer;
			  case "<":  return entity[filteredKey] < comparer;
			  case ">":  return entity[filteredKey] > comparer;
			  case "!=": return entity[filteredKey] != comparer;
			  default: 	 return false;
			}
		});
		return Repository(results);
	};

	operatorHandler = function (operator) {
		return createGetProxy(function (rcvr, comparer) {
			return filterEntities(filteredKey, operator, comparer)
		});
	};


	return createGetProxy(function (obj, key) {
		if (key == "get") return entities.length == 1? entities.pop() : entities;
		filteredKey = key;
		return createGetProxy(function (obj, filter) {
			return comparisonOperators.indexOf(filter) != -1?
				operatorHandler(filter) : 
				filterEntities(filteredKey, "==", filter);	
		})
	});

};