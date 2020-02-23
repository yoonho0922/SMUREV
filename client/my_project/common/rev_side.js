FlowRouter.template('/rev_side', 'rev_side');

// Template.rev_side.onRendered(function() {
//
//     var path = FlowRouter.current().path;
//     var split = path.split('/');
//
//     switch (split[1]) {
//         case 'rev_myPosts':
//             $('#myPosts').attr('style', 'color:blue')
//             break;
//         case 'rev_recPosts':
//             $('#recPosts').attr('style', 'color:blue')
//             break;
//     }
// });

Template.rev_side.helpers({
    email: function() {
        return Meteor.user().emails[0].address; //화면에 사용자의 이메일을 전달
    },
    userInfo: function() {
        return Meteor.user();
    },
    nickname : function(){
        //정보 수정 한번도 안했을 경우 닉네임 등록
        if(Meteor.user().profile == null){
            var userInfo = Meteor.user();
            //이메일의 @ 앞 부분을 닉네임으로 설정
            var nickname = Meteor.user().emails[0].address.split('@')[0];
            Meteor.users.update({_id: userInfo._id}, {
                $set: {
                    'profile.nickname': nickname,
                }
            });
        }

        return Meteor.user().profile.nickname;
    },
    modProfile: function () {
        return Session.get('modProfile');
    },
    link: function() {  //프사 가져오기

        var file_id = Meteor.user().profile.img;
        if(!file_id){   //사진 등록 안했을 경우
            return '/img/default_user_img.png'   //기본 썸네일
        }else{
            return DB_FILES.findOne({_id: file_id}).link(); //등록된 사진
        }
    },

    //버튼 활성화
    activated10 : function(){
        var path = FlowRouter.current().path;
        var split = path.split('/');
        if(split[1]=='rev_myPosts'){
            return 'color : blue';
        } return;
    },
    activated11 : function(){
        var path = FlowRouter.current().path;
        var split = path.split('/');
        if(split[1]=='rev_recPosts'){
            return 'color : blue';
        } return;
    },
    activated0: function(){
        if(FlowRouter.getParam('area') == '전체'){
            return 'color : skyblue;';
        }
        return;
    },
    activated1: function(){
        if(FlowRouter.getParam('area') == '상명대'){
            return 'color : skyblue;';
        }
        return;
    },
    activated2: function(){
        if(FlowRouter.getParam('area') == '신촌'){
            return 'color : skyblue;';
        }
        return;
    },
    activated3: function(){
        if(FlowRouter.getParam('area') == '경복궁'){
            return 'color : skyblue;';
        }
        return;
    },
    activated4: function(){
        if(FlowRouter.getParam('area') == '종각'){
            return 'color : skyblue;';
        }
        return;
    },
    activated5: function(){
        if(FlowRouter.getParam('area') == '을지로'){
            return 'color : skyblue;';
        }
        return;
    },
    activated6: function(){
        if(FlowRouter.getParam('area') == '홍제'){
            return 'color : skyblue;';
        }
        return;
    },
    activated7: function(){
        if(FlowRouter.getParam('area') == '불광'){
            return 'color : skyblue;';
        }
        return;
    },
    activated8: function(){
        if(FlowRouter.getParam('area') == '기타'){
            return 'color : skyblue;';
        }
        return;
    },

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


