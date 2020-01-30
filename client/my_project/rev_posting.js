FlowRouter.template('/rev_posting/:_id', 'rev_posting');


Template.rev_posting.onRendered(function() {
    $('#editor').summernote({
        popover: {},
        minHeight: 200,
        maximumImageFileSize: 1048576*10
    });
});

Template.rev_posting.helpers({
    post: function() {
        var _id = FlowRouter.getParam('_id');
        if(_id === 'newPosting') {
            return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
        }

        Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
            $('#editor').summernote('reset')
        });

        return DB_REVS.findOne({_id: _id});
    }
});

Template.rev_posting.events({
    'click #btn-save': function() {

        var title = $('#inp-title').val();
        // var html = $('#editor').summernote('code');
        var content=$('#inp-content').val();
        var place=$('.inp-place').val();
        var tag=$('.inp-tag').val();

        if(!title) {
            return alert('제목은 반드시 입력 해 주세요.');
        }
        var _id = FlowRouter.getParam('_id');
        if( _id === 'newPosting') {
            DB_REVS.insert({
                createdAt: new Date(),
                title: title,
                content: content,
                place:place,
                tag:tag,
                recommend:0,
                readCount: 0,
                file_id:[]

            })
        } else {
            var post = DB_POSTS.findOne({_id: _id});

            post.title = title;
            post.content = content;
            post.place=place;
            post.tag=tag;
            DB_REVS.update({_id: _id}, post);
        }

        alert('저장하였습니다.');
        // $('#inp-name').val('');
        $('#inp-title').val('');
        // $('#editor').summernote('reset');
        $('#inp-content').val();
        $('.inp-place').val();
        $('.inp-tag').val();


        window.history.back();
    },
})