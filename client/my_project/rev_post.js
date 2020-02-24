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
    nickname : function(){
        var _id = FlowRouter.getParam('_id');
        var user_id = DB_REVS.findOne({_id:_id}).user_id;
        var user = Meteor.users.findOne({_id:user_id});
        return user.profile.nickname;
    },
    user_link : function(){
        var _id = FlowRouter.getParam('_id');
        var user_id = DB_REVS.findOne({_id:_id}).user_id;
        var user = Meteor.users.findOne({_id:user_id});
        var file_id = user.profile.img;
        if(!file_id){
            return '/img/default_user_img.png'  //파일 없을 경우 기본 사진
        }
        return DB_FILES.findOne({_id: file_id}).link();
    },

    writer: function() {
        //this에는 DB_COMMENTS {} 하나하나가 들어 있음.
        return Meteor.users.findOne({writer: FlowRouter.getParam('_id')}).username;


    },
    link : function(){
        var _id = FlowRouter.getParam('_id');
        var file_id = DB_REVS.findOne({_id : _id}).file_id;
        if(!file_id){   //파일이 없을 경우
            return '/img/default_post_img.jpg'   //기본 썸네일
            // return '/examples/0002.jpeg'
        }else{
            return DB_FILES.findOne({_id: file_id}).link();
        }
    },
    rec_img: function () {

        if(Meteor.user() == null){
            return 'rec_normal.png';
        }

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;

        if(!DB_RECOMMEND.findOne({post_id : post_id, user_id : user_id})){
            return 'rec_normal.png';
        }else{
            return 'rec_over.png';
        }
    },
    rec_users : function(){
        var post_id = FlowRouter.getParam('_id');
        return DB_RECOMMEND.findAll({post_id:post_id});
    },
    rec_user_nickname : function(){
        var user_id = this.user_id;
        return Meteor.users.findOne({_id : user_id}).profile.nickname;
    },

    comments: function() {
        return DB_COMMENT.find({post_id: FlowRouter.getParam('_id')});
    },
    comment_link : function(){
        var user_id = this.user_id;
        var user = Meteor.users.findOne({_id: user_id});
        var file_id = user.profile.img;
        if(!file_id){
            return '/img/default_user_img.png'  //파일 없을 경우 기본 사진
        }
        return DB_FILES.findOne({_id: file_id}).link();
    },
    comment_nickname : function(){
        var user_id = this.user_id;
        var user = Meteor.users.findOne({_id: user_id});
        return user.profile.nickname;
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
            if(confirm('삭제하겠습니까?')==true){
                DB_REVS.remove({_id: _id});

                //추천 목록 DB에서 삭제
                var rec = DB_RECOMMEND.findAll({post_id : _id});
                rec.forEach(function(e) {
                    DB_RECOMMEND.remove({_id : e._id});
                });


                alert('삭제되었습니다.');
                window.history.back();
            }
        }else{
            alert('권한이 없습니다.')
        }

    },

    'click #btn-rec': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }

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

            //알림 등록
            var passive_user_id = DB_REVS.findOne({_id : post_id}).user_id;
            var post_title = DB_REVS.findOne({_id : post_id}).title;
            DB_NOTICE.insert({
                passive_user_id : passive_user_id,
                active_user_id : user_id,
                post_id : post_id ,
                post_title : post_title,
                notice_type : "rec"
            });

            alert('추천');
        }else{
            DB_RECOMMEND.remove({_id : recommend._id});     //추천 관계 목록 삭제
            revs.recommend -= 1;    //REVS의 post 추천수 감소
            DB_REVS.update({_id: post_id}, revs);

            // //알림 삭제
            // var notice = DB_NOTICE.findOne({active_user_id : user_id, post_id : post_id});
            // if(notice != null){     //알림이 남아있을 경우 지워준다.
            //     var notice_id = DB_NOTICE.findOne({active_user_id : user_id, post_id : post_id})._id;
            //     DB_NOTICE.remove({_id:notice_id});
            // }

            alert('추천 취소');
        }
    },

    'click #submit':function () {

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;
        var comment=$('#comment-input').val();
        var revs = DB_REVS.findOne({_id : post_id});


        DB_COMMENT.insert({    // 댓글 DB에 저장
            post_id: post_id,
            user_id: user_id,
            user_email: Meteor.user().emails[0].address,
            createdAt: new Date(),          // 저장 시각
            comment: comment,// 댓글내용
        });
        $('#comment-input').val('');

        revs.commentCount += 1;    //REVS의 commentCount 증가
        DB_REVS.update({_id: post_id}, revs);

        //알림 등록
        var rev = DB_REVS.findOne({_id : post_id});
        var passive_user_id = rev.user_id;
        var post_title = rev.title;
        DB_NOTICE.insert({
            passive_user_id : passive_user_id,
            active_user_id : user_id,
            post_id : post_id ,
            post_title : post_title,
            notice_type : "com"
        });

        alert('댓글등록');

    },
    'click #comment-remove': function () {
        if (confirm('삭제 하시겠습니까?')) {
            var comment_user_id = this.user_id;
            var current_user_id = Meteor.user()._id;
            var post_id = FlowRouter.getParam('_id');
            var revs = DB_REVS.findOne({_id: post_id});

            if (comment_user_id == current_user_id || Meteor.user().emails[0].address == "admire@gmail.com") {
                //댓글쓴이 '본인'일 경우 또는 '관리자계정'일 경우
                DB_COMMENT.remove({_id: this._id});

                revs.commentCount -= 1;    //REVS의 post 추천수 감소
                DB_REVS.update({_id: post_id}, revs);


                alert('삭제 되었습니다.');
            } else {
                alert('권한이 없습니다!')
            }
        }
    }
})