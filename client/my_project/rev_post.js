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
    writer: function() {
        //this에는 DB_COMMENTS {} 하나하나가 들어 있음.
        return Meteor.users.findOne({writer: FlowRouter.getParam('_id')}).username;


    },
    rec_img: function () {
        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;

        if(!DB_RECOMMEND.findOne({post_id : post_id, user_id : user_id})){
            return 'rec_normal.png';
        }else{
            return 'rec_over.png';
        }
    },
    comments: function() {
        return DB_COMMENT.find({post_id: FlowRouter.getParam('_id')});
    },
    comment_link : function(){
        var user_id = this.user_id;
        var user = Meteor.users.findOne({_id: user_id});
        return DB_FILES.findOne({_id: user.profile.img}).link();
    },
    comment_nickname : function(){
        var user_id = this.user_id;
        var user = Meteor.users.findOne({_id: user_id});
        return user.profile.nickname;
    },
    comment_email : function(){
        var user_id = this.user_id;
        console.log(user_id);
        var user = Meteor.users.findOne({_id: user_id});
        return user.emails[0].address;
    },
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

                var rec = DB_RECOMMEND.findOne({post_id : _id});
                DB_RECOMMEND.remove({_id : rec._id});   //추천 목록 DB에서 삭제
                
                alert('삭제되었습니다.');
                window.history.back();
            }
        }else{
            alert('권한이 없습니다.')
        }

    },

    'click #btn-rec': function() {
        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;
        var recommend = DB_RECOMMEND.findOne({post_id : post_id, user_id : user_id});
        var revs = DB_REVS.findOne({_id : post_id});
        if(!recommend){
            DB_RECOMMEND.insert({   //추천 관계 목록 업데이트
                post_id : post_id,
                user_id : user_id
            });
            revs.recommend += 1;    //REVS의 post 추천수 증가
            DB_REVS.update({_id: post_id}, revs);
            alert('추천');
        }else{
            DB_RECOMMEND.remove({_id : recommend._id});     //추천 관계 목록 삭제
            revs.recommend -= 1;    //REVS의 post 추천수 감소
            DB_REVS.update({_id: post_id}, revs);
            alert('추천 취소');
        }
    },

    'click #submit':function () {
        var comment=$('#comment-input').val();

        DB_COMMENT.insert({    // 댓글 DB에 저장
            post_id: FlowRouter.getParam('_id'),
            user_id: Meteor.user()._id,
            createdAt: new Date(),          // 저장 시각
            comment: comment,// 댓글내용
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