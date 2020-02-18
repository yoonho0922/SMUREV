FlowRouter.template('/rev_main/:area/:tag/:order', 'rev_main');
FlowRouter.template('/rev_main/:area/:tag', 'rev_main');
FlowRouter.template('/rev_main/:area', 'rev_main');
FlowRouter.template('/rev_main', 'rev_main');

Template.rev_main.onRendered(function() {
    // 화면이 그려지고 난 후 제일 먼저 수행
    // Session.set('type_list', true);

});

Template.rev_main.helpers({

    type_list: function() {
        return Session.get('type_list'); //화면을 회원가입 모드로 변경/복구
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
        Session.set('type_list', true);
    },
    'click #btn-feed': function(){
        Session.set('type_list', false);
    },
    'click #btn-newest': function(){
            location.href="/rev_main/전체/전체/new";
    },
    'click #btn-rec': function(){
    },
    
    //태그 버튼 함수
    'click #btn-tag0': function(){

    },
    'click #btn-tag1': function(){
    },
    'click #btn-tag2': function(){
    },

    ///클릭하면 색상 변경
    'click #btn-tag0': function(){
            $("#btn-tag0").css("background-color","lightgray")
        }
});
