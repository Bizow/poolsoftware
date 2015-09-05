
Template.collectionDropDown.events({
    'click [data-collection]': function () {
        var selected = this;
        Reporter.setDefaultSelections();
        Reporter.selections.set("collection", selected);
    }
});

Template.collectionDropDown.helpers({
    collections: function () {
        //TODO make this a collection that can be inserted into
        return [
            {"name": "Activities", "skipColumns": ["_id"]},
            {"name": "Agencies"},
            {"name": "Alertreports"},
            {"name": "Locations"},
            {"name": "Narratives"}
        ];
    },
    selectedCollection: function () {
        var selected = Reporter.selections.get("collection");
        return selected? selected: Reporter.defaultSelections["collection"];
    }
});

Template.columnDropDown.events({
    'click [data-column]': function () {
        var selected = this;
        Reporter.selections.set("column", selected);
    }
});

Template.columnDropDown.helpers({
    columnHeaders: function () {
        return Reporter.columnHeaders();
    },
    selectedColumn: function () {
        var selected = Reporter.selections.get("column");
        return selected? selected: Reporter.defaultSelections["column"];
    }
});

Template.filterDropDown.events({
    'click [data-filter]': function () {
        var selected = this;
        Reporter.selections.set("filter", selected);
    }
});

Template.filterDropDown.helpers({
    filters: function () {
        var filters = [
            {"name": "equals"}
        ];
        return filters;
    },
    selectedFilter: function () {
        var selected = Reporter.selections.get('filter');
        return selected? selected: Reporter.defaultSelections["filter"];
    }
});

Template.valueInput.events({
    'keyup [data-value-input]': function (event, template) {
        var input = template.find('input');
        var value = input.value;
        console.log('value:',value);
        Reporter.selections.set("value", value);
    },
    'submit [data-value-form]': function (event, template) {
        event.preventDefault();
        var report = {
            "collection": Reporter.selections.get("collection"),
            "column": Reporter.selections.get("column"),
            "filter": Reporter.selections.get("filter"),
            "value": Reporter.selections.get("value")
        };
        console.log(report);
        Meteor.call('insertReport', report, function (error, result) {
            console.log('insertReport error:', error, 'result:', result);
            //TODO handle error
        });
        return false;
    },
    'click [data-clear-input]': function (event, template) {
        template.find('input').value = "";
    }
});

Template.valueInput.helpers({
    value: function () {
        return Reporter.selections.get("value");
    }
});
