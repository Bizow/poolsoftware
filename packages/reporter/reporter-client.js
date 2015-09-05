
Reporter = {};

Reporter.selections = new ReactiveDict('reporter');

Reporter.defaultSelections = {
  "collection": {"name": "Collection", "default": true},
  "column": {"name": "Column", "default": true},
  "filter": {"name": "Filter", "default": true},
  "value": ""
};

Reporter.setDefaultSelections = function () {
  var self = this;
  _.each(self.defaultSelections, function (v, k) {
    self.selections.set(k, v);
  });
};

Reporter.columnHeaders = function () {
  var self = this;
  var columnHeaders = [{"name": "No Collection selected"}];
  var collection = self.selections.get("collection");
  if(collection && collection.default !== true){
    var item = window[collection.name].findOne({});
    if(item){
      columnHeaders = [];
      var keys = _.keys(item);
      _.each(collection.skipColumns, function (name) {
        var i = keys.indexOf(name);
        if(i != -1) {
          keys.splice(i, 1);
        }
      });
      _.each(keys, function (key) {
        columnHeaders.push({"name": key});
      });
      if(columnHeaders.length === 0){
        columnHeaders = [{"name": "Collection "+collection.name+" is empty"}];
      }
    }
  }
  return columnHeaders;
};

Reporter.rows = function () {
  var self = this;
  var rows = [{"columns": [""]}];
  var collection = self.selections.get("collection");
  var column = self.selections.get("column");
  var filter = self.selections.get("filter");
  var value = self.selections.get("value");
  console.log(
    'collection:', collection,
    'column:', column,
    'filter', filter,
    'value', value
  );
  if(collection && collection.default !== true){
    rows = [];
    var cursor = window[collection.name].find({});
    if(column && filter && value){
      if(filter.name === 'equals'){
        var q = {};
        q[column.name] = value;
        cursor =  window[collection.name].find(q);
      }
    }
    cursor.forEach(function (item) {
      _.each(collection.skipColumns, function (name) {
        delete item[name];
      });
      var values = _.values(item);
      var columns = [];
      _.each(values, function (value) {
        columns.push({"value": value});
      });
      rows.push({"columns": columns});
    });
  }
  return rows;
};
