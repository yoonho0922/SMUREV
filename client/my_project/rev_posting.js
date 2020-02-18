FlowRouter.template('/rev_posting/:_id', 'rev_posting');


Template.rev_posting.onRendered(function() {
    $('#editor').summernote({
        popover: {},
        minHeight: 200,
        maximumImageFileSize: 1048576*10,
        callbacks: {
            onImageUpload : function(files) {
                alert(111)
                if (!files.length) return;
                var file = files[0];
                // create FileReader
                var reader  = new FileReader();
                reader.onloadend = function () {
                    // when loaded file, img's src set datauri
                    console.log("img",$("<img>"));
                    var img = $("<img>").attr({src: reader.result, width: "100%"}); // << Add here img attributes !
                    console.log("var img", img);
                    $('#editor').summernote("insertNode", img[0]);
                }

                if (file) {
                    // convert fileObject to datauri
                    reader.readAsDataURL(file);
                }
            }
        }
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

        var user_id = Meteor.user()._id;
        var user_email = Meteor.user().emails[0].address;
        var user_nickname = Meteor.user().profile.nickname;

        var title = $('#inp-title').val();
        var content = $('#editor').summernote('code');
        var posting_area=$('.inp-area').val();
        var posting_tag=$('.inp-tag').val();
        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        var file_id = DB_FILES.insertFile(file);

        if(!title) {
            return alert('제목은 반드시 입력 해 주세요.');
        }
        var _id = FlowRouter.getParam('_id');

        if( _id === 'newPosting') {
            DB_REVS.insert({
                user_id : user_id,
                user_email : user_email,
                user_nickname : user_nickname,
                createdAt: new Date(),
                title: title,
                content: content,
                posting_area:posting_area,
                posting_tag:posting_tag,
                recommend:0,
                readCount: 0,
                file_id:file_id
            })
        } else {
            var post = DB_POSTS.findOne({_id: _id});

            post.title = title;
            post.content = content;
            post.posting_area=posting_area;
            post.posting_tag=posting_tag;
            DB_REVS.update({_id: _id}, post);
        }

        alert('저장하였습니다.');
        $('#inp-title').val('');
        $('#editor').summernote('reset');
        // $('#inp-content').val();
        $('.inp-area').val();
        $('.inp-tag').val();


        window.history.back();
    },
})