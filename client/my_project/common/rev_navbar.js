FlowRouter.template('/rev_navbar', 'rev_navbar');

Template.rev_navbar.events({
    'click #before':function () {
        window.history.back();
    },
    'click #btn-logout': function() {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
    },
//////검색기능
    'click #btn-search': function () {
        alert("검색");
        var search_content=$('#inp-search').val();

        DB_SEARCH.insert({    //DB에 검색기록 저장
            search_content:search_content
        });
        $('#inp-search').val('');
        // var _id = DB_SEARCH.findOne({_id: _id});
        // var _id = FlowRouter.getParam('_id');


    }

})

Template.rev_navbar.helpers({
    search_content: function() {
        return FlowRouter.getParam('search_content');
    },
    // search_content: function() {
    //     return DB_SEARCH.search_content[0];
    // },
});
