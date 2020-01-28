FlowRouter.template('/main_list', 'main_list');


Template.main_list.onRendered(function() {

});

Template.main_list.helpers({
    boards: function() {
        return DB_POSTS.findAll({}, {sort: {createdAt: -1}});
    },
    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    }
});

Template.main_list.events({
    'click #btn-remove': function() {
        alert('삭제');
        // if(confirm('삭제 하시겠습니까?')) {
        //     DB_POSTS.remove({_id: this._id});
        //     alert('삭제 되었습니다.');
        // }
    }
});