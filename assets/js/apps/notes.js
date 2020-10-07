    if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(()=>{
        //console.log("serviceworker registered"); 
    })
    .catch((err)=>{
        //console.log("serviceworker not registered"+err);
    })
}
    function deleteNote() {
        $(".delete-note").off('click').on('click', function(event) {
          event.stopPropagation();
           var token = getitem('usertoken');
           var email = value('email');
          var delid = $(this).attr('budgetid');
          //console.log(delid);
        // $(this).append('<i class="fa fa-spinner fa-spin deli"></i>');
         // $(this).parents('.note-item').remove();
         var data = email+'&^%'+token+'&^%'+delid;
         toast('Deleting....',true);
         pull('delete',{
            method:'POST',
            body:data,
         })
         .then(response=>response.json())
         .then((result)=>{
            $(".deli").remove();
            if(result.code==200){
                $(this).parents('.note-item').remove();
                toast('Deleted successfully');
                fetchbudgets();
            }
            else {
                toast(result.token);

            }
         })
         .catch((err)=>{
            console.log(err);
            //$(".deli").remove();
         })
        })
    }
    

         function loadnote(){
            ///this function loads notifications
            var email = value('email');
            var token = getitem('usertoken');
            toast("Loading notifications",true);
            var data = email+'&^%'+token;
            pull('notifications',{
                method:'POST',
                body:data,
            })
            .then(response=>response.json())
            .then((data)=>{
             //   toast("Notification Loaded ");
                //console.log(data);
                closetoast();
                if(data.code==200){
                    get('notifs').innerHTML='';
                    var notifs = data.notifications.splice(0,5);
                    notifs.forEach((note)=>{
                        if(note.type!=""){
                        var html = `<div class="dropdown-item">
                                <div class="media file-upload">
                                    <div class="media-body">
                                    <a href="javascript:void(0);">
                                        <div class="data-info">
                                            <h6 class="">${note.notification}</h6>
                                            
                                        </div>

                                        <div class="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                            $(".notifs").append(html);
                          
                        }

                    })
                }
            })
            .catch((err)=>{
                toast("Notification Loading Failed because"+err);
            })
         }
        $(document).ready(function() {

    function favNote() {
        $(".fav-note").off('click').on('click', function(event) {
          event.stopPropagation();
          $(this).parents('.note-item').toggleClass('note-fav');
        })
    }

    function addLabelGroups() {
        $('.tags-selector .label-group-item').off('click').on('click', function(event) {
          event.preventDefault();
          /* Act on the event */
          var getclass = this.className;
          var getSplitclass = getclass.split(' ')[0];
          if ($(this).hasClass('label-personal')) {
            $(this).parents('.note-item').removeClass('note-social');
            $(this).parents('.note-item').removeClass('note-work');
            $(this).parents('.note-item').removeClass('note-important');
            $(this).parents('.note-item').toggleClass(getSplitclass);
          } else if ($(this).hasClass('label-work')) {
            $(this).parents('.note-item').removeClass('note-personal');
            $(this).parents('.note-item').removeClass('note-social');
            $(this).parents('.note-item').removeClass('note-important');
            $(this).parents('.note-item').toggleClass(getSplitclass);
          } else if ($(this).hasClass('label-social')) {
            $(this).parents('.note-item').removeClass('note-personal');
            $(this).parents('.note-item').removeClass('note-work');
            $(this).parents('.note-item').removeClass('note-important');
            $(this).parents('.note-item').toggleClass(getSplitclass);
          } else if ($(this).hasClass('label-important')) {
            $(this).parents('.note-item').removeClass('note-personal');
            $(this).parents('.note-item').removeClass('note-social');
            $(this).parents('.note-item').removeClass('note-work');
            $(this).parents('.note-item').toggleClass(getSplitclass);
          }
        });
    }

    $('.hamburger').on('click', function(event) {
        $('.app-note-container').find('.tab-title').toggleClass('note-menu-show')
        $('.app-note-container').find('.app-note-overlay').toggleClass('app-note-overlay-show')
    })
    $('.app-note-overlay').on('click', function(e){
        $(this).parents('.app-note-container').children('.tab-title').removeClass('note-menu-show')
        $(this).removeClass('app-note-overlay-show')
    })
    $('.tab-title .nav-pills a.nav-link').on('click', function(event) {
        $(this).parents('.app-note-container').find('.tab-title').removeClass('note-menu-show')
        $(this).parents('.app-note-container').find('.app-note-overlay').removeClass('app-note-overlay-show')
    })

    var $btns = $('.list-actions').click(function() {
        if (this.id == 'all-notes') {
          var $el = $('.' + this.id).fadeIn();
          $('#ct > div').not($el).hide();
        } if (this.id == 'important') {
          var $el = $('.' + this.id).fadeIn();
          $('#ct > div').not($el).hide();
        } else {
          var $el = $('.' + this.id).fadeIn();
          $('#ct > div').not($el).hide();
        }
        $btns.removeClass('active');
        $(this).addClass('active');  
    })

    $('#btn-add-notes').on('click', function(event) {
        $('#notesMailModal').modal('show');
        $('#btn-n-save').hide();
        $('#btn-n-add').show();
    })

    // Button add
    $("#btn-n-add").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;
        var loading = true;
        
        //$(this).append('<i class="fa fa-spinner fa-spin"></i>');
        var name = value('n-title');
        var price = value('price');
        var quantity = value('quantity');
        if(name==""||quantity==""||price==""){
            inform('Empty Budget Name,price or quantity');
        }   
        else if(quantity<1){
            inform("Quantity must be more than 0 zero");
        }
        else if(price<1){
            inform("Item Price must be  more than 0 zero");
        }
        else if(name.split().indexOf("@")>-1){
            inform("Invalid Item Name");
        }
        else {
            var token = getitem('usertoken');
            $(this).attr('disabled',true);
            $(this).append('<i class="fa fa-spinner fa-spin"></i>');
            inform('Loading.......<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>');
            var data = name+"@"+price+"@"+quantity+"@"+token;
            window.setInterval(function(){
                if(loading){
             $('#notesMailModal').modal('show');
         }
            },1000);
            pull('addbudget',{
                method:'POST',
                body:data,
            })
            .then(response=>response.json())
            .then((result)=>{
                loading = false;
                loading = false;
                inform("");
                $(this).attr('disabled',false);
                get('btn-n-add').innerHTML='Add Budget';
                if(result.code==200){
                    toast(name+' added to budget successfully');
                    $('#notesMailModal').modal('hide');                    
                    Swal.fire({
                        icon:'success',
                        text:name+' added to budget successfully',
                        showConfirmButton:false,
                        timer:2000,
                    })
                    .then((res)=>{
                        get('n-title').value = '';
                        get('price').value = '';
                        get('quantity').value='';
                         
                         fetchbudgets();


                    })

                }
                else {

                    overlay(result.token);
                }
            })
            .catch((err)=>{
                loading = false;
                inform("");
                $(this).attr('disabled',false);
                 get('btn-n-add').innerHTML='Add Budget';
                overlay('Request Failed');
            })
        }

        
        //$("#ct").prepend($html);
        //$('#notesMailModal').modal('hide');

    });
    function inform(text){
        get('info').innerHTML=text;
    }
    

    deleteNote();
    favNote();
    addLabelGroups();
})

// Validation Process

var $_getValidationField = document.getElementsByClassName('validation-text');

// getNoteTitleInput = document.getElementById('n-title');

// getNoteTitleInput.addEventListener('input', function() {

//     getNoteTitleInputValue = this.value;

//     if (getNoteTitleInputValue == "") {
//       $_getValidationField[0].innerHTML = 'Title Required';
//       $_getValidationField[0].style.display = 'block';
//     } else {
//       $_getValidationField[0].style.display = 'none';
//     }
// })

// getNoteDescriptionInput = document.getElementById('n-description');

// getNoteDescriptionInput.addEventListener('input', function() {

//   getNoteDescriptionInputValue = this.value;

//   if (getNoteDescriptionInputValue == "") {
//     $_getValidationField[1].innerHTML = 'Description Required';
//     $_getValidationField[1].style.display = 'block';
//   } else {
//     $_getValidationField[1].style.display = 'none';
//   }

// })