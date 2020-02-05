FlowRouter.template('/main_list', 'main_list');


Template.main_feed.onRendered(function() {

});

Template.main_feed.helpers({
    boards: function() {
        return DB_REVS.findAll({}, {sort: {createdAt: -1}});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    }
});

Template.main_feed.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        return order;
    }
});

Template.main_feed.events({
    'click #btn-rec': function() {
    }
});