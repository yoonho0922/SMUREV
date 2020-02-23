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

    }
})

Template.rev_myPage.events({
    'click #btn-update-profile': function() {

        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();
        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        if(!file){  //파일을 안 등록했을 경우
            var file_id = userInfo.profile.img;
        }else{  //등록 했을 경우
            var file_id = DB_FILES.insertFile(file);
        }



        //유저 닉넴 중복체크

        //글로된 유저 정보 업데이트
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
                'profile.img' : file_id
            }
        });

        alert('수정 되었습니다')
        Session.set('modProfile', false);
    }
})