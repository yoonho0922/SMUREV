FlowRouter.template('/rev_myPage', 'rev_myPage');

Template.rev_myPage.helpers({
    userInfo: function() {
        return Meteor.user();
    },
    link : function(){

        var file_id = Meteor.user().profile.img;
        if(!file_id){   //사진 등록 안했을 경우
            return '/img/default_user_img.png'   //기본 썸네일
        }else{
            return DB_FILES.findOne({_id: file_id}).link(); //등록된 사진
        }

    },
    active_user_link : function(){
        var user_id = this.active_user_id;
        var user = Meteor.users.findOne({_id: user_id});
        var file_id = user.profile.img;
        if(!file_id){
            return '/img/default_user_img.png'  //파일 없을 경우 기본 사진
        }
        return DB_FILES.findOne({_id: file_id}).link();
    },
    notices : function(){
        var passive_user_id = Meteor.user()._id;
        return DB_NOTICE.findAll({passive_user_id : passive_user_id});

    },
    notice_content : function () {
        var notice = this;
        var post = this.post_title;

        if(notice.notice_type === "rec"){
            var active_user = Meteor.users.findOne({_id:this.active_user_id}).profile.nickname;
            return active_user + " 님이 회원님의 게시글 \'" + post + "\' 을(를) 추천하였습니다.";
        }else if(notice.notice_type === "com"){
            var active_user = Meteor.users.findOne({_id:this.active_user_id}).profile.nickname;
            return active_user + " 님이 회원님의 게시글 \'" + post + "\' 에 댓글을 달았습니다.";
        }
    },
    post_href : function(){
        var post = DB_REVS.findOne({_id:this.post_id});
        var area = post.posting_area;
        var tag = post.posting_tag;
        var _id = post._id;
        // /rev_post/경복궁/한식/new/be3gMiic7DrMnr38K
        return area + "/" + tag + "/new/" + _id;
    }
})

Template.rev_myPage.events({
    'click #btn-update-profile': function() {

        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();

        //Null처리
        if(!nickname){
            alert('닉네임을 입력해 주세요!!')
            return;
        }

        //유저 닉넴 중복체크
        if(Meteor.user().profile.nickname != nickname){
            if(Meteor.users.findOne({'profile.nickname' : nickname})){
                alert('닉네임이 중복됩니다!!')
                return;
            }
        }

        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        if(!file){  //파일을 안 등록했을 경우
            var file_id = userInfo.profile.img;
        }else{  //등록 했을 경우
            var file_id = DB_FILES.insertFile(file);
        }



        //글로된 유저 정보 업데이트
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
                'profile.img' : file_id
            }
        });

        alert('수정 되었습니다')
        Session.set('modProfile', false);
    },

    'click #btn-remove' : function() {
        DB_NOTICE.remove({_id : this._id});
    }
})