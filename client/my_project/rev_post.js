FlowRouter.template('/rev_post/:area/:tag/:order/:_id','rev_post');

Template.rev_post.helpers({
    board: function() {
        var _id = FlowRouter.getParam('_id');
        return DB_REVS.findOne({_id: _id});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    }
});

Template.rev_post.events({

    'click #btn-mod': function() {
        if(confirm('수정하겠습니까?')){
            var _id = FlowRouter.getParam('_id');
            location.href="/rev_posting/"+_id;
        }

    },

    'click #btn-del': function() {
        if(confirm('삭제하겠습니까?')){
            DB_REVS.remove({_id: FlowRouter.getParam('_id')});
        }
    },

    'click #btn-rec': function() {
        var _id = FlowRouter.getParam('_id')
        DB_REVS.update({_id: _id}, {
            $inc: {recommend: 1}  //조회수 1 증가 업데이트
        });
        alert('추천')
    }
})