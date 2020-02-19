FlowRouter.template('/rev_main/:area/:tag/:order', 'rev_main');
FlowRouter.template('/rev_main/:area/:tag', 'rev_main');
FlowRouter.template('/rev_main/:area', 'rev_main');
FlowRouter.template('/rev_main', 'rev_main');

Template.rev_main.onRendered(function() {

});

Template.rev_main.helpers({

    view_type: function() {
        return Session.get('view_type'); //화면을 회원가입 모드로 변경/복구
    },
    area : function(){
        var area = FlowRouter.getParam('area');
       //  if(!area){
       //     location.href="/rev_main/전체/전체/new";
       // }
       return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        // if(!tag){
        //     location.href="/rev_main/전체/전체/new";
        // }

        return tag;
    },

    activated40: function(){    //view_type이 리스트(false)일 때
        if(!Session.get('view_type')){
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated41: function(){    //view_type이 앨범(true)일 때
        if(Session.get('view_type')){
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated30: function(){
        if(FlowRouter.getParam('order') == 'new'){
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated31: function(){
        if(FlowRouter.getParam('order') == 'rec'){
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated0: function(){
        if(FlowRouter.getParam('tag') == '전체'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated1: function(){
        if(FlowRouter.getParam('tag') == '한식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated2: function(){
        if(FlowRouter.getParam('tag') == '일식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated3: function(){
        if(FlowRouter.getParam('tag') == '중식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated4: function(){
        if(FlowRouter.getParam('tag') == '양식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated5: function(){
        if(FlowRouter.getParam('tag') == '분식'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated6: function(){
        if(FlowRouter.getParam('tag') == '카페'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated7: function(){
        if(FlowRouter.getParam('tag') == '포차'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    },
    activated8: function(){
        if(FlowRouter.getParam('tag') == '기타'){
            return 'background-color : skyblue; color : white;';
        }
        return;
    }
});

Template.rev_main.events({
    
    //글 보기방식 버튼 함수
    'click #btn-album': function() {
        Session.set('view_type', true);
    },
    'click #btn-list': function(){
        Session.set('view_type', false);
    },
    'click #btn-newest': function(){
            location.href="/rev_main/전체/전체/new";
    },
    'click #btn-rec': function(){
        location.href="/rev_main/전체/전체/rec";
    },
});
