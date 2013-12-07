$(document).ready(function() {
	
	var file_name = null;
	var clicktrigger = false ;
	
    $("#TB_ajaxContent").css({"width" : "650px", "height" : "100%"});
    
    $("#cancel").live("click", function(){ $('#file_details').html(""); });
    
    $('.sendtoeditor').live("click", function() {
    	if( clicktrigger )return ;
    	clicktrigger = true ;
    	$(this).attr("disabled", true) ;
    	var nname = $(this).attr('alt') ;
    	wpcsw_process_setting('sendeditor', 'start') ;
        var file='';
        var now = new Date();
        var dt=now.getDate(); 
        var tm=now.getTime();
    	ajaxdata = {
				action		: 'wpcsw_ajaxprocess',
				fucname		: 'get_parameters', 
				filename	: nname
			 };
		$.post('function.php', ajaxdata, function( param ) {
			//var file = "[copysafe name='"+nname+"'" + param + "]" ;
                        var file = "<div><span class='copy_"+dt+tm+"'>[copysafe name='"+nname+"'" + param + "]</span></div>" ;

                ExampleDialog.insert(file);
	        wpcsw_process_setting('sendeditor', 'end') ;
	        clicktrigger = true ;
		});
		return false;
    }) ;
    
    $("#wpcsw_div .ui-tabs-anchor").click(function(){
    	var iid = $(this).attr("id") ;
    	iid = iid.substring(0, iid.length-3);
    	$("#wpcsw_div .ui-tabs-panel").hide() ;
    	$("#"+iid).show() ;
    	$(this).parents(".ui-tabs-nav").children(".ui-state-default").removeClass("ui-state-active") ;
    	$(this).parent().addClass("ui-state-active") ;
    });
    
    //----------------------------------------
    var wpcsw_string_adjust = function(s, n){
    	var s_length = s.length ;
    	if(s_length <= n )return s;
    	var c_n = Math.floor(n/2) ;
    	var e_n = s_length - n + 3 + c_n ;
    	s = s.substr(0, c_n) + "..." + s.substr(e_n);
    	return s ;
    }
    var pluginurl = $("#plugin-url").val() ;
	var plugindir = $("#plugin-dir").val() ;
	var upload_path = $("#upload-path").val() ;
	var max_size = $("#upload-max-size").val() ;
	
	var prequeue = "" ;
	var wpcsw_process_setting = function(frm, status){
		if( status == "start" )$("#wpcsw_ajax_process").show() ;
		if( status == "end" )$("#wpcsw_ajax_process").hide() ;
		if( frm == "load" ){
    		if( status == "start" ){
        		$("#wpcsw_message").html("") ;
        		$('input:button').attr("disabled", true);
        	}
    		if( status == "end" ){    			
				$('#file_select').uploadify('cancel', prequeue);
				prequeue = "" ;
				$("#custom-queue").html("No file chosen") ;
				$('input:button').attr("disabled", false);
        	}
    	}
		
    	if( frm == "search" ){
    		if( status == "start" ){
        		$("#search").attr("disabled", true);
        	}
    		if( status == "end" ){     			
    			$("#search").attr("disabled", false);
        	}
    	}
    	
    	if( frm == "setting" ){
    		if( status == "start" ){        		
        		
        	}
    		if( status == "end" ){   			
    			
        	}
    	}    	
    } 
	
    $('#file_select').uploadify({ 
    	'method'   		 : 'post',
		'swf'       	 : pluginurl+'lib/uploadify/uploadify.swf',
		'uploader'       : pluginurl+'lib/uploadify/uploadify.php',
		'formData'		 : {'upload_path' : upload_path},
		'height'		 : 20,
		'width'			 : 104,
		'buttonImage'  	 : pluginurl+'lib/uploadify/file_select.png',		
		'multi'          : false,
		'auto'           : false,
		'fileExt'        : '*.class;*.CLASS',
		'queueID'        : 'upload-queue',	
		'removeCompleted': true,
		'removeTimeout'  : 0.1,
		'fileObjName' 	 : 'wpcsw_file',
		'fileSizeLimit'  : max_size + 'KB',
		'onSelect' 	 : function(file) {			
    		$("#custom-queue").html(wpcsw_string_adjust(file.name, 30)) ;
    		if(prequeue)$('#file_select').uploadify('cancel', prequeue);
    		prequeue = file.id;
		},
		'onUploadSuccess' : function(file, data, response) {
			var file_name = file.name ;
			ajaxdata = {
					action			: 'wpcsw_ajaxprocess',
					fucname			: 'file_upload', 
					error			: data
				 };
			$.post('function.php', ajaxdata, function( param ) {
				wpcsw_process_setting("load", "end") ;
				var contents = $.parseJSON(param) ;
				$( "#wpcsw_message" ).html(contents["message"]) ;
				$( "#wpcsw_upload_list" ).html(contents["list"]) ;				
	            $( "#tabs-2-bt" ).trigger("click") ;
				$( "#wpcsw_searchfile" ).val(file_name);
	            $( "#search" ).trigger("click");
			});
        },
		'onUploadError'  : function (file, errorCode, errorMsg, errorString) {
			if(errorCode == -280)return false;
			$("#custom-queue").html(errorString) ;
			$("#wpcsw_ajax_process").hide() ;
		}
	});
    
    $("#upload").click(function(){ 
    	if( !prequeue )return ;
    	$('#file_select').uploadify('upload'); 
    	wpcsw_process_setting("load", "start") ;
    }) ;
    
	$("#search").click(function(){
		file_name = $("#wpcsw_searchfile").val();
		var postid = $("#postid").val();
		if ( !file_name ) {
			alert ('Type a file name');
			$("#wpcsw_searchfile").focus(); 
		}else {
			ajaxdata = {
					action	: 'wpcsw_ajaxprocess',
					fucname	: 'file_search', 
					search	: file_name, 
					post_id	: postid
				 };
			wpcsw_process_setting("search", "start") ;
			$.post('function.php', ajaxdata, function( param ) {				
				wpcsw_process_setting("search", "end") ;
				$('#file_details').html(param);				
			});
		}
	});
    
	$('.setdetails').live("click", function() {
		$( "#tabs-2-bt" ).trigger("click") ;
        $("#wpcsw_searchfile").val($(this).attr('alt'));
        $("#search").trigger("click");
        return false;
    });
	
	$("#setting_save").live("click", function(){
            var now = new Date();
        var dt=now.getDate(); 
        var tm=now.getTime();
        var postid=dt+tm;
		var setData = {} ;
		$("#wpcsw_setting_body input").each(function(){
			var nname = $(this).attr("name") ;
			if(nname == "key_safe" || nname == "capture_safe" || nname == "menu_safe" || nname == "remote_safe" ){
				setData[nname] = ($(this).attr("checked") == "checked" ) ? 1 : 0 ;
                               
			}else{
				setData[nname] = $(this).val() ;
                               
			}
		}) ;
		ajaxdata = {
				action		: 'wpcsw_ajaxprocess',
				fucname		: 'setting_save', 
				post_id		:  postid,
				nname		: $("#wpcsw_searchfile").val(),
				set_data	: $.toJSON(setData)								
			 };
		wpcsw_process_setting("setting", "start") ;
		$.post('function.php', ajaxdata, function( param ) {
			$( "#wpcsw_message" ).html(param);
			wpcsw_process_setting("setting", "end") ;
                        $( "#tabs-3-bt" ).trigger("click") ;
		});
	});
	
	$("#wpcsw_setting_body img").live("click", function(){
		alert($(this).attr("alt")) ;
	});
        
 $('.delete').live("click", function() {      
     	ajaxdata = {
				action		: 'wpcsw_ajaxprocess',
				fucname		: 'setting_del', 
				nname		: $(this).attr('alt')								
			 };
		wpcsw_process_setting("setting", "start") ;
		$.post('function.php', ajaxdata, function( param ) {
			alert('Deleted');
			wpcsw_process_setting("setting", "end") ;
                        location.reload(true);
                        $( "#tabs-3-bt" ).trigger("click") ;
		});
 });	
});

function formatText(iframe, command, option) {
    iframe.contentWindow.focus();
    try{
        iframe.contentWindow.document.execCommand(command, false, option); //Right here
    }catch(e){console.log(e)}
    iframe.contentWindow.focus();
}
