FlowRouter.template('/rev_myPage', 'rev_myPage');

Template.rev_myPage.helpers({
    userInfo: function() {
        return Meteor.user();
    }
})