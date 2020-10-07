function pull(requrl,body){
    if(window.location.origin=='http://localhost'){
          var prefix ='../backend/budgetapp/'

      }
      else {
         //var prefix ='../backend/budgetapp/'
        var prefix = "https://novling.000webhostapp.com/budgetapp/";
    }
  return  fetch(prefix+requrl,body)
  		


}

function loading(){
  //$("body").append('"');
  $("body").append(`<div class="loading">
        <div class="boxes">
            <div class="boxone"></div>
            <div class="boxtwo"></div>
            <div class="boxthree"></div>
        </div>
    </div>`);
}
function closeload(){
  $('.loading').remove();
}
$(".logoutbtn").click(function(e){
	e.preventDefault();
	Swal.fire({
  title: 'Are you sure you want to logout?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Log me out!'
}).then((result) => {
  if (result.value) {
    toast("Logging you out",true);
  	openload();
  	localStorage.removeItem('admintoken');
	localStorage.removeItem('usertoken');
	window.location.href="login";
    
  }
})
	
})
function closemodal(){
  Swal.fire({
    background:'transparent',
    backdrop:'transparent',
    showConfirmButton:false,
    timer:0,
  })
}
 $(".createresume").click(function(e){
            e.preventDefault();
            var token = getitem('usertoken');
            if(token){
                window.location.href="create";
            }
            else {
                login();
            }
        })
function get(e){
	return document.getElementById(e);
}
function value(e){
	return get(e).value;
}
function setitem(name,value){
	return localStorage.setItem(name,value);
}
function getitem(name){
	if(localStorage.getItem(name)==undefined||localStorage.getItem(name)==null||localStorage.getItem(name)==""){
		return false;
	}
	else {
		return localStorage.getItem(name);
	}
}
function toast(toast,type){
  closetoast();
  if(!type||type==undefined){
    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                        </svg>`;

  }
  else {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>';

  }
  $("body").append(`<div class="alert toasting alert-arrow-left alert-icon-left alert-light-primary mb-4" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" data-dismiss="alert" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                        ${svg}
                                        <strong>${toast}</strong>.
                                    </div>`);
  window.setTimeout(function(){
    closetoast();
  },15000);
}
function closetoast(){
  $(".toasting").remove();
}
function titler(title){
 document.title =title;
}
window.onhashchange = function(e){
  var url = e.oldURL;
   var arr = url.split("#");
  var end = arr[1];
  loading();
  var newhash = e.target.location.hash;
  var hash = newhash.split("#")[1];
  //console.log(end,hash);
  router(hash);
} 
 window.onload = function(e){
  var link = window.location.href;
  var arr = link.split("");
  var ind = arr.indexOf("#");
  if(ind>0){
    console.log('hashed');
    var newlink = link.split("#");
    var end = newlink[1];
    router(end);

  } 
  else {
    fetchbudgets();
  }
 }
 function nope(){
  $(".progcont").remove();
 }
  function fetchshares(){
    $(".statsarea").hide();
    var email = value('email');
         if(email==""){
                window.setTimeout(()=>{
                    fetchshares();
                },3000);
          }
        else {
        var token = getitem('usertoken');
        var email = value('email');
        // get('addnew').innerHTML=` <a id="sharebudget" class="btn btn-me" href="javascript:void(0);">
        //                                                 <i class="fa fa-plus"></i> Share a Budget
        //                                             </a>`;
         document.getElementById("ct").innerHTML='';
        var data = email+'&^%'+token;
         toast('Loading Budgets',true);
            $(".note-grid").append('<div class="loadbudgets"><i class="fa fa-spinner fa-spin"></i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg></div>');
        pull('shares',{
            method:'POST',
            body:data,
        })
        .then(response=>response.json())
        .then((data)=>{
            if(data.code==200){
              closetoast();
                var shared = data.budgets;
                if(shared.length==1){
                   document.getElementById("ct").innerHTML='';
                       var html = `   <div class="note-item all-notes note-social nobudgets">
                                       <div class="note-inner-content">
                                            <div class="note-content">
                                                <p class="note-title" data-noteTitle="Budget NAME">Hello</p>
                                                
                                                <div class="note-description-content">
                                                    <p class="note-description" data-noteDescription="Budget Quantity">
                                                        You've not shared any budget
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="note-action text-right right">
                                                 <a id="sharebudget" class="btn btn-me" href="javascript:void(0);">
                                                        <i class="fa fa-plus"></i> Share a Budget
                                                    </a>
                                                
                                            </div>
                                           
                                        </div>
                                    </div>`;
                        $(".note-grid").append(html);
                } 
                else {
                   document.getElementById("ct").innerHTML='';
                  shared.forEach((share)=>{
                    if(share.code!=""){

                    var bud = `  <div class="note-item all-notes note-social">
                                        <div class="note-inner-content">
                                            <div class="note-content">
                                                <p class="note-title" >${share.budgetname}</p>
                                                <p class="meta-time">Budget Code : ${share.code}</p>
                                                <div class="note-description-content">
                                                    <p class="note-description" data-noteDescription="Budget Quantity">
                                                        Visits : ${share.visits}
                                                        <br />
                                                       <span class="right"> ${share.date} </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="note-action text-right right">
                                               
                                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link openlink"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>

                                                <svg xmlns="http://www.w3.org/2000/svg" budgetid=${share.code} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 delete-share"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                            </div>
                                           
                                        </div>
                                    </div>`;
                                     $(".note-grid").append(bud);
                                   }
                  })
                   feather.replace();
                }
            }
            else if(data.code==403){
              document.getElementById("ct").innerHTML='';
                       var html = `   <div class="note-item all-notes note-social nobudgets">
                                       <div class="note-inner-content">
                                            <div class="note-content">
                                                <p class="note-title" data-noteTitle="Budget NAME">Hello</p>
                                                
                                                <div class="note-description-content">
                                                    <p class="note-description" data-noteDescription="Budget Quantity">
                                                        You've not shared any budget
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="note-action text-right right">
                                                 <a id="sharebudget" class="btn btn-me" href="javascript:void(0);">
                                                        <i class="fa fa-plus"></i> Share a Budget
                                                    </a>
                                                
                                            </div>
                                           
                                        </div>
                                    </div>`;
                        $(".note-grid").append(html);
            }
            else {
                toast(data.token);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
      }
    }
    var Selector = {
        mainHeader: '.header.navbar',
        headerhamburger: '.toggle-sidebar',
        fixed: '.fixed-top',
        mainContainer: '.main-container',
        sidebar: '#sidebar',
        sidebarContent: '#sidebar-content',
        sidebarStickyContent: '.sticky-sidebar-content',
        ariaExpandedTrue: '#sidebar [aria-expanded="true"]',
        ariaExpandedFalse: '#sidebar [aria-expanded="false"]',
        contentWrapper: '#content',
        contentWrapperContent: '.container',
        mainContentArea: '.main-content',
        searchFull: '.toggle-search',
        overlay: {
            sidebar: '.overlay',
            cs: '.cs-overlay',
            search: '.search-overlay'
        }
    };

    // Default Enabled
    function closeop(){
         $(Selector.mainContainer).removeClass('topbar-closed');
                // hide overlay
        $('.overlay').removeClass('show');
        $('html,body').removeClass('sidebar-noneoverflow');
    }
function router(route){
 // console.log(route);
 closeop();
 //loaduser();
  var hash = route;
  if(hash!=undefined){
    $("body").append(`<div class="progcont"></div>`);
    loading();
    if(hash=="app"){
        titler("Budgets");
        fetchbudgets();
        o();
    }
    else if(hash=="shared"){
      titler("Shared Budgets");
      fetchshares();
      o();
    }

   
    else {
      console.log(hash);
    }
  }
   loadnote();
}

function o(){
        closeload();
        nope();
}
function login(){
    localStorage.removeItem('usertoken');
    window.location.href='login';
}
function getInner(e){
	return get(e).innerHTML;
}
function load(id){
	get(id).innerHTML='<i class="fa fa-spinner fa-spin"></i>';
}

function overlay(text){
	Swal.fire({
		html:text,
		showConfirmButton:false,
		showCancelButton:false,
		showCloseButton:true,
		allowOutsideClick:true,
	})


}
 function validateEmail(email) 
            {
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            }
function openload(){
		Swal.fire({
		footer:'Loading....',
		showConfirmButton:false,
		showCancelButton:false,
		showCloseButton:false,
		allowOutsideClick:false,
	})
}