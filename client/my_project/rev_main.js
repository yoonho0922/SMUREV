FlowRouter.template('/rev_main/:area/:tag', 'rev_main');
FlowRouter.template('/rev_main', 'rev_main');

Template.rev_main.onRendered(function() {
    // 화면이 그려지고 난 후 제일 먼저 수행
    Session.set('type_list', true);

});

Template.rev_main.helpers({

    type_list: function() {
        return Session.get('type_list'); //화면을 회원가입 모드로 변경/복구
    },
    revs: function() {

    },
});

Template.rev_main.events({
    
    //글 보기방식 버튼 함수
    'click #btn-album': function() {
        Session.set('type_list', true);
    },
    'click #btn-feed': function(){
        Session.set('type_list', false);
    },
    'click #btn-newest': function(){
        alert('최신순');
    },
    'click #btn-rec': function(){
        alert('추천순');
    },
    
    //태그 버튼 함수
    'click #btn-tag0': function(){
        alert('#전체')
    },
    'click #btn-tag1': function(){
        alert('#한식')
    },
    'click #btn-tag2': function(){
        alert('#일식')
    }
});
