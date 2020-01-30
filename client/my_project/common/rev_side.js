FlowRouter.template('/rev_side', 'rev_side');

Template.rev_side.onRendered(function() {
    // 화면이 그려지고 난 후 제일 먼저 수행
    Session.set('count', 0);
});

Template.rev_side.helpers({
    // 화면에 데이터를 전달
    count: function() {
        var count = Session.get('count');
        if (!count) {
            return 'Click!';
        } else {
            return 'Count: ' + count;
        }
    }
});

Template.rev_side.events({
    // 화면의 이벤트를 처리
    'click #btn-count': function() {
        Session.set('count', Session.get('count')+1);
    }
});