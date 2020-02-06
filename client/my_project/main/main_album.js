FlowRouter.template('/main_album', 'main_album');

Template.main_album.onRendered(function() {

})

Template.main_album.helpers({
    boards: function() {
        return DB_REVS.findAll({}, {sort: {createdAt: -1}});
    },
    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    }

});

Template.main_album.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        if(!area){
            return '전체';
        }
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        if(!tag){
            return '전체';
        }
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        if(!order){
            return 'new';
        }
        return order;
    },
    link:function () {
        var rev_link = FlowRouter.getParam('rev_link');
        return rev_link;

    }
});

Template.main_album.events({

})
