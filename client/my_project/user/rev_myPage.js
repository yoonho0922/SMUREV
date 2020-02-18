FlowRouter.template('/rev_myPage', 'rev_myPage');

Template.rev_myPage.helpers({
    userInfo: function() {
        return Meteor.user();
    }
})

Template.rev_myPage.events({
    'click #btn-update-profile': function() {

        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();
        // var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        // var file_id = DB_FILES.insertFile(file);


        //글로된 유저 정보
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
            }
        });
        //프로필 사진

        // if(!file_id){
        //     if(!DB_PRO_PICTURE.findOne({user_id: userInfo._id})){
        //         DB_PRO_PICTURE.insert({
        //             'user_id' : userInfo._id,
        //             'file_id' : file_id
        //         })
        //     }else{
        //         var proPicture = DB_PRO_PICTURE.findOne({user_id: userInfo._id});
        //         var _id = proPicture._id;
        //         proPicture.file_id = file_id;
        //         DB_PRO_PICTURE.update({_id:_id}, proPicture);
        //     }
        // }

        alert('수정 되었습니다')
        Session.set('modProfile', false);
    }
})