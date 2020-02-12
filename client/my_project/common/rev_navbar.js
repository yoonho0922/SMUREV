FlowRouter.template('/rev_navbar', 'rev_navbar');

Template.rev_navbar.events({
    'click #before':function () {
        window.history.back();
    },
    'click #btn-logout': function() {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
    }
})