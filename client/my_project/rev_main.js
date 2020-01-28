FlowRouter.template('/rev_main', 'rev_main');

Template.rev_main.onRendered(function() {

});

Template.rev_main.helpers({

    visual_type: function() {
        var visual_type = 'album';

        return visual_type;
    }

});

Template.rev_main.events({
    
    //글 보기방식 버튼 함수
    'click #btn-album': function() {
        alert('앨범형');
    },
    'click #btn-list': function(){
        alert('목록형');
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
