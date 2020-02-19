FlowRouter.template('/main_list', 'main_list');


Template.main_list.onRendered(function() {

});

Template.main_list.helpers({
    boards: function() {
        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order')
        if(area=='전체'&&tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({}, {sort: {createdAt: -1}});
            }
        }else if(area=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_tag': tag}, {sort: {createdAt: -1}});
            }

        }else if(tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({'posting_area': area}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_area': area}, {sort: {createdAt: -1}});
            }
        }else{
            if(order=='rec'){
                return DB_REVS.findAll({'posting_area': area, 'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_area': area, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }
        }

    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    },
    rec_img: function () {
        var post_id = this.id
        console.log(post_id);
        var user_id = Meteor.user()._id;

        if(!DB_RECOMMEND.findOne({post_id : post_id, user_id : user_id})){
            return 'rec_normal.png';
        }else{
            return 'rec_over.png';
        }
    }
});

Template.main_list.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        return order;
    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()
    },
    username:function () {
        return DB_REVS.findOne({_id: this.user_nickname})

    }

});

Template.main_list.events({
});