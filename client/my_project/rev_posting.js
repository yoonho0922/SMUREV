FlowRouter.template('/rev_posting/:_id', 'rev_posting');


Template.rev_posting.onRendered(function() {

    $('#editor').summernote({
        popover: {},
        minHeight: 200,
        maximumImageFileSize: 1048576*10,
        callbacks: {
            onImageUpload : function(files) {
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
    link : function(){
        var _id = FlowRouter.getParam('_id');
        if(_id === "newPosting"){   //글쓰기 일경우 기본 썸네일
            return '/img/default_post_img.jpg';
        }
        var file_id = DB_REVS.findOne({_id : _id}).file_id;
        if(!file_id){   //파일을 안저장했을 경우
            return '/img/default_post_img.jpg'   //기본 썸네일
        }else{
            return DB_FILES.findOne({_id: file_id}).link();
        }
        
    },
    post: function() {
        var _id = FlowRouter.getParam('_id');
        if(_id === 'newPosting') {
            $('#select1').val('전체');


            return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
        }

        Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
            $('#editor').summernote('reset')
        });


        return DB_REVS.findOne({_id: _id});
    },

    //지역
    selected10 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='전체'){
            return 'selected';
        }
    },
    selected11 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='상명대'){
            return 'selected';
        }
    },
    selected12 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='신촌'){
            return 'selected';
        }
    },
    selected13 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='경복궁'){
            return 'selected';
        }
    },
    selected14 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='종각'){
            return 'selected';
        }
    },
    selected15 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='을지로'){
            return 'selected';
        }
    },
    selected16 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='홍제'){
            return 'selected';
        }
    },
    selected17 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='불광'){
            return 'selected';
        }
    },
    selected18 : function(){
        var _id = FlowRouter.getParam('_id');
        var area = DB_REVS.findOne({_id:_id}).posting_area;
        if(area=='기타'){
            return 'selected';
        }
    },
    //태그
    selected20 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='전체'){
            return 'selected';
        }
    },
    selected21 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='한식'){
            return 'selected';
        }
    },
    selected22 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='일식'){
            return 'selected';
        }
    },
    selected23 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='중식'){
            return 'selected';
        }
    },
    selected24 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='양식'){
            return 'selected';
        }
    },
    selected25 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='분식'){
            return 'selected';
        }
    },
    selected26 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='카페'){
            return 'selected';
        }
    },
    selected27 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='포차'){
            return 'selected';
        }
    },
    selected28 : function(){
        var _id = FlowRouter.getParam('_id');
        var tag = DB_REVS.findOne({_id:_id}).posting_tag;
        if(tag=='기타'){
            return 'selected';
        }
    },

});

Template.rev_posting.events({


    'click #btn-save': function() {

        var user_id = Meteor.user()._id;
        var user_email = Meteor.user().emails[0].address;

        var title = $('#inp-title').val();
        var content = $('#editor').summernote('code');
        var posting_area=$('.inp-area').val();
        var posting_tag=$('.inp-tag').val();

        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
        if(file != null) {  //파일이 선택됐을 경우
            var file_id = DB_FILES.insertFile(file);//DB_FILES에 파일 저장하고 file_id가져오기
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
            var createdAt = new Date()
            DB_REVS.insert({
                user_id : user_id,
                user_email : user_email,
                createdAt: createdAt,
                title: title,
                content: content,
                posting_area:posting_area,
                posting_tag:posting_tag,
                recommend:0,
                readCount: 0,
                file_id:file_id
            });
            _id = DB_REVS.findOne({createdAt : createdAt})._id
            alert('글을 올렸습니다.');
            location.href="/rev_post/"+posting_area+"/"+posting_tag+"/new/"+_id;
        } else {
            var revs = DB_REVS.findOne({_id: _id});

            revs.title = title;
            revs.content = content;
            revs.posting_area=posting_area;
            revs.posting_tag=posting_tag;
            if(file != null){
                revs.file_id=file_id;
            }
            DB_REVS.update({_id: _id}, revs);

            // window.history.back();      이거 때문에 글 수정 시 파일 저장이 안됐던거임 하.......
            alert('글을 수정하였습니다.');
            var order = FlowRouter.getParam('order');
            location.href="/rev_post/"+posting_area+"/"+posting_tag+"/"+order+"/"+_id;
        }

    },
})