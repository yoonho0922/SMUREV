import {toggleClass} from "cheerio";

FlowRouter.template('/rev_side', 'rev_side');

Template.rev_side.onRendered(function() {
    // Session.set('mymod', false);
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
    link: function() {  //프사 가져오기....
        // var user_id = Meteor.user()._id;
        // var img_id = users.
        // return DB_FILES.findOne({_id: this.img_id}).link()
    }
});

Template.rev_side.events({
    'click #btn-mod-profile': function(){
        Session.set('modProfile', true);
    },
    'click #btn-update-profile': function() {
        var userInfo = Meteor.user();
        var nickname = $('#inp-nickname').val();
        Meteor.users.update({_id: userInfo._id}, {
            $set: {
                'profile.nickname': nickname,
                // 'profile.img' : img_id
            }
        });

        // //프사 저장
        // var img = $('#inp-img').prop('files')[0];
        // var img_id = DB_PROFILE.insertFile(img);
        //
        // var post = DB_PROFILE.findOne({_id: _id});
        //
        // post.title = title;



        alert('수정 되었습니다')
        Session.set('modProfile', false);
    },
    // 'click .nav-item': function(){
    //     $(".nav-link").css("background-color","lightgray")
    //
    //
    // }

});


