FlowRouter.template('/rev_navbar', 'rev_navbar');

Template.rev_navbar.events({
    'click #before':function () {
        window.history.back();
    }
})