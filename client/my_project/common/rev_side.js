FlowRouter.template('/rev_side', 'rev_side');

Template.rev_side.onRendered(function() {
    // Session.set('mymod', false);

    switch (FlowRouter.current().path) {

        case '/rev_main/상명대/전체/new':
            alert(10)
            $('#nav-item1').attr('style', 'color:red')
            return
        case '/rev_main/전체/전체/new':
            alert(11)
            $('#nav-item0').attr('style', 'background-color:lightgray')
            return
        default:
    }
});

Template.rev_side.helpers({
    email: function() {
        return Meteor.user().emails[0].address; //화면에 사용자의 이메일을 전달
    },
    userInfo: function() {
        return Meteor.user();
    },
    modProfile: function () {
        return Session.get('modProfile');
    },
    link: function() {  //프사 가져오기
        var proPicture = DB_PRO_PICTURE.findOne({user_id: userInfo._id});
        alert(proPicture.file_id.link());
        return proPicture.file_id.link();
    },

    // nav_item0: function() {
    //   // if (FlowRouter.current().path === '/rev_main/전체/전체/new')
    //       alert(11)
    //       return 'background-color: lightgray;'
    // },
    // ex_carousel: function() {
    //   if (FlowRouter.current().path === '/ex_carousel')
    //     return 'color: red;'
    // }


// }

});

Template.rev_side.events({
    'click #btn-mod-profile': function(){
        Session.set('modProfile', true);
    },
    'click #btn-update-profile': function() {
        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();
        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        var file_id = DB_FILES.insertFile(file);


        //글로된 유저 정보
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
            }
        });
        //프로필 사진

        if(!DB_PRO_PICTURE.findOne({user_id: userInfo._id})){
            DB_PRO_PICTURE.insert({
                'user_id' : userInfo._id,
                'file_id' : file_id
            })
        }else{
            var proPicture = DB_PRO_PICTURE.findOne({user_id: userInfo._id});
            var _id = proPicture._id;
            proPicture.file_id = file_id;
            DB_PRO_PICTURE.update({_id:_id}, proPicture);
        }
        alert('수정 되었습니다')
        Session.set('modProfile', false);
    }
});


