FlowRouter.template('/rev_recPosts/:area/:tag/:order','rev_recPosts')

Template.rev_recPosts.helpers({
    boards: function() {
        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order')

        //추천 목록에 있는 게시글 배열revs에 저장
        var rec_revs = new Array();
        var recommend = DB_RECOMMEND.findAll({user_id:Meteor.user()._id})
        recommend.forEach(function(element){
             rec_revs.push(DB_REVS.findOne({_id : element.post_id}));
        });

        var boards = new Array();
        // return revs;

        // revs.sort()

        if(area=='전체'&&tag=='전체'){  //필터링 X
            if(order=='rec'){
                boards = rec_revs.sort(function(a, b) { // 추천 내림차순 정렬
                    return b["recommend"] - a["recommend"];
                });
                return boards;
            }else{
                boards = rec_revs.sort(function(a, b) { // 시간 내림차순
                    return b["createdAt"] - a["createdAt"];
                });
                return boards;
            }
        }else if(area=='전체'){   //태그만 선택됨
            if(order=='rec'){
                rec_revs.forEach(function(e){
                    if(e.posting_tag == tag){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 시간 내림차순 정렬
                    return b["recommend"] - a["recommend"];
                });

            }else{
                rec_revs.forEach(function(e){
                    if(e.posting_tag == tag){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 시간 내림차순 정렬
                    return b["createdAt"] - a["createdAt"];
                });
            }

        }else if(tag=='전체'){    //지역만 선택됨
            if(order=='rec'){
                rec_revs.forEach(function(e){
                    if(e.posting_area == area){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 추천 내림차순 정렬
                    return b["recommend"] - a["recommend"];
                });
            }else{
                rec_revs.forEach(function(e){
                    if(e.posting_area == area){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 시간 내림차순 정렬
                    return b["createdAt"] - a["createdAt"];
                });
            }
        }else{  //지역 태그 둘 다 선택됨
            if(order=='rec'){
                rec_revs.forEach(function(e){
                    if(e.posting_tag == tag && e.posting_area == area){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 추천 내림차순 정렬
                    return b["recommend"] - a["recommend"];
                });
            }else{
                rec_revs.forEach(function(e){
                    if(e.posting_tag == tag && e.posting_area == area){
                        boards.push(e);
                    }
                });

                return boards.sort(function(a, b) { // 시간 내림차순 정렬
                    return b["createdAt"] - a["createdAt"];
                });
            }
        }

    },
    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()

    },
    nickname: function() {
        var user_id = this.user_id;
        return Meteor.users.findOne({_id: user_id}).profile.nickname;
    },



    //버튼 활성화 비활성화
    activated30: function(){
        if(FlowRouter.getParam('order') == 'new'){  //최신순일 때
            return 'background-color : gray; color : white;';
        }
        return;
    },
    activated31: function(){
        if(FlowRouter.getParam('order') == 'rec'){  //추천순일 때
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

Template.rev_recPosts.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        if(!area){
            return '전체';
        }
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        if(!tag){
            return '전체';
        }
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        if(!order){
            return 'new';
        }
        return order;
    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()

    }
});