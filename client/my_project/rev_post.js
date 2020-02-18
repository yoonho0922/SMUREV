FlowRouter.template('/rev_post/:area/:tag/:order/:_id','rev_post');

Template.rev_post.helpers({
    board: function() {
        var _id = FlowRouter.getParam('_id');
        return DB_REVS.findOne({_id: _id});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    },
    area: function(){
        return FlowRouter.getParam('area');
    },
    comments: function() {
        return DB_COMMENT.find({revs_id: FlowRouter.getParam('_id')});
    },
    writer: function() {
        //this에는 DB_COMMENTS {} 하나하나가 들어 있음.
        return Meteor.users.findOne({writer: FlowRouter.getParam('_id')}).username;


    }
});

Template.rev_post.events({

    'click #btn-mod': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }
        var _id = FlowRouter.getParam('_id');
        var revs = DB_REVS.findOne({_id: _id});
        var email = Meteor.user().emails[0].address;
        if(Meteor.user()._id == revs.user_id || !revs.user_id || email == 'admire@gmail.com'){
            if(confirm('수정하겠습니까?')){
                location.href="/rev_posting/"+_id;
            }
        }else{
            alert('권한이 없습니다.')
        }

    },

    'click #btn-del': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }

        var _id = FlowRouter.getParam('_id');
        var revs = DB_REVS.findOne({_id: _id});
        var email = Meteor.user().emails[0].address;
        if(Meteor.user()._id == revs.user_id || !revs.user_id || email == 'admire@gmail.com'){
            if(confirm('삭제하겠습니까?')){
                var area = FlowRouter.getParam('area');
                var tag = FlowRouter.getParam('tag');
                var order = FlowRouter.getParam('order');
                DB_REVS.remove({_id: _id});
                alert('삭제되었습니다.');
                location.href="/rev_main/"+area+"/"+tag+"/"+order;
            }
        }else{
            alert('권한이 없습니다.')
        }

    },

    'click #btn-rec': function() {
        var _id = FlowRouter.getParam('_id')
        DB_REVS.update({_id: _id}, {
            $inc: {recommend: 1}  //조회수 1 증가 업데이트
        });
        alert('추천')
    },

    'click #submit':function () {
        var comment=$('#comment-input').val();

        DB_COMMENT.insert({    // 댓글 DB에 저장
            createdAt: new Date(),          // 저장 시각
            comment: comment,// 댓글내용
            writer: Meteor.user().emails.address,//유저아이디
            username:Meteor.user().profile.nickname,
            revs_id: FlowRouter.getParam('_id')
        });
        $('#comment-input').val('');
    },
    'click #comment-remove': function () {
        if(confirm('삭제 하시겠습니까?')) {
            DB_COMMENT.remove({_id: this._id});
            alert('삭제 되었습니다.');
        }

    }
})