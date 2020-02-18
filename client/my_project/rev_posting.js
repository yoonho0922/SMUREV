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
        if(file != null) {
            var file_id = DB_FILES.insertFile(file);
        }else{  //파일선택 안했을 경우 기본 썸네일
            var file_id = 'agKuAs8oGDFzHmasF';
        }

        if(!title) {
            return alert('제목을 입력해주세요');
        }else if(posting_area=='지역'){
            return alert('지역을 선택해주세요.');
        }else if(posting_tag=='태그'){
            return alert('태그를 선택해주세요.');
        }else if(content == ''){
            return alert('본문을 입력해주세요.');
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
            });

            window.history.back();
            alert('글을 올렸습니다.');
        } else {
            var revs = DB_REVS.findOne({_id: _id});

            revs.title = title;
            revs.content = content;
            revs.posting_area=posting_area;
            revs.posting_tag=posting_tag;
            DB_REVS.update({_id: _id}, revs);

            window.history.back();
            alert('글을 수정하였습니다.');
        }
        // $('#inp-title').val('');
        // $('#editor').summernote('reset');
        // // $('#inp-content').val();
        // $('.inp-area').val();
        // $('.inp-tag').val();

    },
})