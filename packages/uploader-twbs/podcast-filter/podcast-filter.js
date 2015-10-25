



Template.podcastListFilter.onCreated( function  () {
    var instance = this ;
    instance.selectedFilter = new ReactiveVar();
    instance.selectedFilter.set('title');
    instance.filterOptions = [
        {name: "Title", value: "title"},
        {name: "Category", value: "category"},
        {name: "Market", value: "market"},
        {name: "Callsign", value: "callsign"}
    ];

    instance.getSelectedFilter = function () {
        var selected = instance.selectedFilter.get();
        return _.findWhere(instance.filterOptions, {value: selected});
    };

    instance.getFilterOptions = function () {
        return instance.filterOptions;
    }
});


Template.podcastListFilter.helpers({
    filterOptions: function () {
        return Template.instance().getFilterOptions();
    },
    selectedOption: function () {
        return Template.instance().getSelectedFilter();
    }
});

Template.podcastListFilter.events({
    'click [data-filter-option]': function (event, instance) {
        event.preventDefault();
        instance.selectedFilter.set(this.value);
    },
    'click [data-filter-clear]': function (event, instance) {
        var parentInstance = instance.view.parentView.parentView.templateInstance();
        var input = instance.find('#filter');
        input.value = '';
        instance.selectedFilter.set('title');
        parentInstance.filterOn.set('title');
        parentInstance.filterValue.set(' ');
    },
    'keyup #filter': function (event, instance) {
        var parentInstance = instance.view.parentView.parentView.templateInstance();
        var input = instance.find('#filter');
        var value = input.value;
        parentInstance.filterOn.set(instance.selectedFilter.get());
        parentInstance.filterValue.set(value);
    }
});