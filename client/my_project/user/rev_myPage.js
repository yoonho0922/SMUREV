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
        if($('#inp-file') == null){
            alert('프로필 사진을 선택해주세요!');
            return;
        }

        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();
        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        var file_id = DB_FILES.insertFile(file);

        //유저 닉넴 중복체크

        //글로된 유저 정보 업데이트
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
                'profile.img' : file_id
            }
        });
        //프로필 사진

        var proPicture = DB_PRO_PICTURE.findOne({user_id: userInfo._id});

        if(!proPicture){    //프사를 처음 등록하는 경우
            DB_PRO_PICTURE.insert({
                'user_id' : userInfo._id,
                'file_id' : file_id
            })
        }else{
            alert(file_id)  //프사를 수정하는 경우
            proPicture.file_id = file_id;
            DB_PRO_PICTURE.update({_id:proPicture._id}, proPicture);
        }


        alert('수정 되었습니다')
        Session.set('modProfile', false);
    }
})