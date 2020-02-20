FlowRouter.template('/rev_searchresult/:area/:tag/:order/:search_content','rev_searchresult')

Template.rev_searchresult.helpers({
    ////닉네임검색결과
    boards: function() {

        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order');
        var search_content=FlowRouter.getParam('search_content');
        // var search_content=DB_SEARCH.findOne({search_content: this.search_content})
        // alert(DB_SEARCH.search_content)

        if(area=='전체'&&tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_nickname:search_content}, {sort: {recommend: -1}});

            }else{
                return DB_REVS.findAll({user_nickname:search_content}, {sort: {createdAt: -1}});
            }
        }else if(area=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_nickname:search_content,'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_nickname:search_content, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }

        }else if(tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({user_nickname:search_content,'posting_area': area}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_nickname:search_content,'posting_area': area}, {sort: {createdAt: -1}});
            }
        }else{
            if(order=='rec'){
                return DB_REVS.findAll({user_nickname:search_content,'posting_area': area, 'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({user_nickname:search_content,'posting_area': area, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }
        }


    },
    ////제목검색결과
    boardsboards: function() {

        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order');
        var search_content=FlowRouter.getParam('search_content');
        // var search_content=DB_SEARCH.findOne({search_content: this.search_content})
        // alert(DB_SEARCH.search_content)

        if(area=='전체'&&tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({title:search_content}, {sort: {recommend: -1}});

            }else{
                return DB_REVS.findAll({title:search_content}, {sort: {createdAt: -1}});
            }
        }else if(area=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({title:search_content,'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({title:search_content, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }

        }else if(tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({title:search_content,'posting_area': area}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({title:search_content,'posting_area': area}, {sort: {createdAt: -1}});
            }
        }else{
            if(order=='rec'){
                return DB_REVS.findAll({title:search_content,'posting_area': area, 'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({title:search_content,'posting_area': area, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }
        }


    },


    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    }

});


Template.rev_searchresult.helpers({

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
    search_content : function(){
        var search_content = FlowRouter.getParam('search_content');

        return search_content;

    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()

    },

    //버튼 활성화 비활성화
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