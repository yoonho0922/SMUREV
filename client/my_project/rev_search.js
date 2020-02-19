FlowRouter.template('/rev_search', 'rev_search');

Template.rev_search.helpers({
    search_content: function() {
        return FlowRouter.getParam('search_content');
    }
});
Template.rev_search.events({
   'click #btn-search': function () {
       alert("검색");
       var search_content=$('#inp-search').val();

       DB_SEARCH.insert({    //DB에 검색기록 저장
           search_content:search_content
       });
       $('#inp-search').val('');


   }
});