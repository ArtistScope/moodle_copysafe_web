var config=new Array();
var l = window.location;
var base_url = l.protocol + "//" + l.host + "/" + l.pathname.split('/')[1];
var base_urls = l.protocol + "//" + l.host + "/";
var wpcsw_plugin_url = base_url+"/mod/copysafeweb/" ;
var wpcsw_upload_url = "./mod/copysafeweb/copysafewebimage/" ;
var m_szImageFolder = "./mod/copysafeweb/copysafewebimage/";
$(document).ready( function() {
var ajaxdata = {
action		: 'wpcsw_ajaxprocess',
fucname	: 'get_config', 
filename	: ''
};
$.post(base_url+'/mod/copysafeweb/function.php', ajaxdata, function( param ) {
    
param=param.split('~');
var obj  = $.parseJSON( param[0] );
$.each(obj, function(key, value) {
//alert(key + ' ' + value);
config[key]=value;
});
wpcsw_plugin_url = param[1] ;
wpcsw_upload_url = param[2] ;
m_szImageFolder = param[2];
              
var urll=$("#url").val();
var res=new Array();
var ress=new Array();
//var $matchess=$("div.no-overflow").filter(function() {
var $matches=$("div.no-overflow span").filter(function() {
var str=$(this).text();
var width=str.substring(str.indexOf("width=")+7);
width=width.substring(0,width.indexOf("\'"));
var height=str.substring(str.indexOf("height=")+8);
height=height.substring(0,height.indexOf("\'"));
var border=str.substring(str.indexOf("border=")+8);
border=border.substring(0,border.indexOf("\'"));
var border_color=str.substring(str.indexOf("border_color=")+14);
border_color=border_color.substring(0,border_color.indexOf("\'"));
var key_safe=str.substring(str.indexOf("key_safe=")+10);
key_safe=key_safe.substring(0,key_safe.indexOf("\'"));
var capture_safe=str.substring(str.indexOf("capture_safe=")+14);
capture_safe=capture_safe.substring(0,capture_safe.indexOf("\'"));
var menu_safe=str.substring(str.indexOf("menu_safe=")+11);
menu_safe=menu_safe.substring(0,menu_safe.indexOf("\'"));
var remote_safe=str.substring(str.indexOf("remote_safe=")+13);
remote_safe=remote_safe.substring(0,remote_safe.indexOf("\'"));
var text_color=str.substring(str.indexOf("text_color=")+12);
text_color=text_color.substring(0,text_color.indexOf("\'"));
var loading_message=str.substring(str.indexOf("loading_message=")+17);
loading_message=loading_message.substring(0,loading_message.indexOf("\'"));
var hyperlink=str.substring(str.indexOf("hyperlink=")+11);
hyperlink=hyperlink.substring(0,hyperlink.indexOf("\'"));
var target=str.substring(str.indexOf("target=")+8);
target=target.substring(0,target.indexOf("\'"));
var spanclass=$(this).attr('class');
var res1=str.substring(16);
var rest=res1.substring(0,res1.indexOf("\'"));
if(rest!='')
var value=insertcopysafeweb(rest,width,height,border,border_color,key_safe,capture_safe,menu_safe,remote_safe,text_color,loading_message,hyperlink,target);
//$(".no-overflow").html(value);
$("span."+spanclass).html(value);
return $(this).text().indexOf('[copysafe name=\''+rest) > -1;
});
//});


});  
});



// hide JavaScript from non-JavaScript browsers

	//  WP Copysafe Web - Version 4.7.2.0
	//  Copyright (c) 1998-2013 ArtistScope. All Rights Reserved.
	//  www.artistscope.com
	//
	// The Copysafe Plugin is supported across all Windows since XP
	//
	// Special JS version for Moodle

// Debugging outputs the generated html into a textbox instead of rendering

// REDIRECTS
 var wpcsw_plugin_url = wpcsw_plugin_url ;
 var wpcsw_upload_url = wpcsw_upload_url ;

// hide JavaScript from non-JavaScript browsers
		

		var m_bpDebugging = 1;
		var m_szMode = "licensed";
		var m_szImageFolder = m_szImageFolder;		//  path from root with / on both ends
		var m_bpKeySafe = 0;
		var m_bpCaptureSafe = 0;
		var m_bpMenuSafe = 0;
		var m_bpRemoteSafe = 0;
		var m_bpWindowsOnly = true;	
		var m_bpProtectionLayer = false;		//this page does not use layer control

		var m_bpChrome = 0;	
		var m_bpFx = 0;			// all firefox browsers from version 5 and later
		var m_bpNav = 0;
		var m_bpOpera = 0;
		var m_bpSafari = 0;
		var m_bpMSIE = 0;

		var m_szDefaultStyle = "ImageLink";
		var m_szDefaultTextColor = "FFFFFF";
		var m_szDefaultBorderColor = "000000";
		var m_szDefaultBorder = 0;
		var m_szDefaultLoading = "loading..";
		var m_szDefaultLabel = "";
		var m_szDefaultLink = "";
		var m_szDefaultTargetFrame = "__self";
		var m_szDefaultMessage = "";  


	

var m_szLocation = document.location.href.replace(/&/g,'%26');	
var m_szDownloadNo = wpcsw_plugin_url + "download_no.html";
var m_szDownloadIE = wpcsw_plugin_url + "download_ie.html?ref=" + m_szLocation;
var m_szDownloadFX = wpcsw_plugin_url + "download_fx.html?ref=" + m_szLocation;



function testCSS(prop) {
    return prop in document.documentElement.style;
}

//if (m_bpDebugging == true)
//	{
//	document.write("UserAgent= " + m_szAgent + "<br>");
//	document.write("Browser= " + m_szBrowserName + "<br>");
//	document.write("Platform= " + m_szPlatform + "<br>");
//	document.write("Referer= " + m_szLocation + "<br>");
//    }




function bool2String(bValue)
{
    if (bValue == true) {return "1";}
    else {return "0";}
}

function paramValue(szValue, szDefault)
{
    if (szValue.toString().length > 0) {return szValue;}
    else {return szDefault;}
}

function expandNumber(nValue, nLength)
{
    var szValue = nValue.toString();
    while(szValue.length < nLength)
        szValue = "0" + szValue;
    return szValue;
}


// The copysafe-insert functions

function insertcopysafeweb(rest,width,height,nBorder,border_color,key_safe,capture_safe,menu_safe,remote_safe,text_color,loading_message,hyperlink,target)
{

             m_bpDebugging = parseInt(config['CopysafeWeb_mode']);
		m_szMode = "licensed";
		m_szImageFolder = m_szImageFolder;		//  path from root with / on both ends
		m_bpKeySafe = key_safe;
		m_bpCaptureSafe = capture_safe;
		m_bpMenuSafe = menu_safe;
		m_bpRemoteSafe = remote_safe;
		m_bpWindowsOnly = true;	
		m_bpProtectionLayer = false;		//this page does not use layer control

		m_bpChrome = parseInt(config['CopysafeWeb_allowchrome']);	
		m_bpFx = parseInt(config['CopysafeWeb_allowfirefox']);			// all firefox browsers from version 5 and later
		m_bpNav = parseInt(config['CopysafeWeb_allownavigator']);
		m_bpOpera = parseInt(config['CopysafeWeb_allowopera']);
		m_bpSafari = parseInt(config['CopysafeWeb_allowsafari']);
		m_bpMSIE = parseInt(config['CopysafeWeb_allowie']);

		m_szDefaultStyle = "ImageLink";
		m_szDefaultTextColor = "FFFFFF";
		m_szDefaultBorderColor = "000000";
		m_szDefaultBorder = 0;
		m_szDefaultLoading = "loading..";
		m_szDefaultLabel = "";
		m_szDefaultLink = "";
		m_szDefaultTargetFrame = "__self";
		m_szDefaultMessage = "";
                
                
                	if (m_bpKeySafe == "1") {
			
			var cswbody = document.getElementsByTagName("body")[0];
				
			cswbody.setAttribute("onload", "showJVMDetails();");
			cswbody.setAttribute("onselectstart", "return false;");
			cswbody.setAttribute("ondragstart", "return false");
			cswbody.setAttribute("onmousedown", "if (event.preventDefault){event.preventDefault();}");
			cswbody.setAttribute("onBeforePrint", "document.body.style.display = '';");
			cswbody.setAttribute("onContextmenu", "return false;");
			cswbody.setAttribute("onClick", "if(event.button==2||event.button==3){event.preventDefault();event.stopPropagation();return false;}");
		}
		else {
			var cswbody = document.getElementsByTagName("body")[0];
			
			cswbody.setAttribute("onselectstart", "return false;");
			cswbody.setAttribute("ondragstart", "return false");
		//	cswbody.setAttribute("onmousedown", "if (event.preventDefault){event.preventDefault();}");
			cswbody.setAttribute("onBeforePrint", "document.body.style.display = '';");
			cswbody.setAttribute("onContextmenu", "return false;");
			cswbody.setAttribute("onClick", "if(event.button==2||event.button==3){event.preventDefault();event.stopPropagation();return false;}");
		}
           
                
//====================================================
//   Current version == 4.7.2.0
//====================================================

var m_nV1=4;
var m_nV2=7;
var m_nV3=2;
var m_nV4=0;

//===========================
//   DO NOT EDIT BELOW 
//===========================

var m_szAgent = navigator.userAgent.toLowerCase();
var m_szBrowserName = navigator.appName.toLowerCase();
var m_szPlatform = navigator.platform.toLowerCase();
var m_bNetscape = false;
var m_bMicrosoft = false;
var m_szPlugin = "";

var m_bWin64 = ((m_szPlatform == "win64") || (m_szPlatform.indexOf("win64")!=-1) || (m_szAgent.indexOf("win64")!=-1));
var m_bWin32 = ((m_szPlatform == "win32") || (m_szPlatform.indexOf("win32")!=-1));
var m_bWin2k = ((m_szAgent.indexOf("windows nt 5.0")!=-1) || (m_szAgent.indexOf("windows 2000")!=-1));
var m_bWinxp = ((m_szAgent.indexOf("windows nt 5.1")!=-1) || (m_szAgent.indexOf("windows xp")!=-1));
var m_bWin2k3 = (m_szAgent.indexOf("windows nt 5.2")!=-1);	
var m_bVista = (m_szAgent.indexOf("windows nt 6.0")!=-1);
var m_bWindows7 = (m_szAgent.indexOf("windows nt 6.1")!=-1);
var m_bWindows8 = ((m_szAgent.indexOf("windows nt 6.2")!=-1) || (m_szAgent.indexOf("windows nt 6.3")!=-1));
var m_bWindows = (((m_bWin2k) || (m_bWinxp) || (m_bWin2k3) || (m_bVista) || (m_bWindows7) || (m_bWindows8)) && ((m_bWin32) || (m_bWin64)));

var m_bOpera = ((m_szAgent.indexOf("opera")!=-1) && !!(window.opera && window.opera.version) && (m_bpOpera));
var m_bFx3 = ((m_szAgent.indexOf("firefox/3.")!=-1) && (m_szAgent.indexOf("flock")==-1) && (m_szAgent.indexOf("navigator")==-1));
var m_bFx4 = ((m_szAgent.indexOf("firefox/4.")!=-1) && (m_szAgent.indexOf("flock")==-1) && (m_szAgent.indexOf("navigator")==-1));
var m_bFirefox = ((m_szAgent.indexOf("firefox")!=-1) && testCSS("MozBoxSizing") && (!(m_bFx3)) && (!(m_bFx4)) && (m_bpFx));

var m_bSafari = ((m_szAgent.indexOf("safari")!=-1) && Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 && (m_bpSafari));
var m_bChrome = ((m_szAgent.indexOf("chrome")!=-1) && !!(window.chrome && chrome.webstore && chrome.webstore.install) && (m_bpChrome));
var m_bNav = ((m_szAgent.indexOf("navigator")!=-1) && (m_bpNav));

var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bNav) || (m_bOpera) || (m_bSafari));
var m_bMicrosoft = (((m_szAgent.indexOf("msie")!=-1) || (m_szAgent.indexOf("trident")!=-1)) && (m_bpMSIE)); 

function CopysafeVersionCheck()
	{
		var v = typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && typeof document.createElement != "undefined";
		var AC = [0,0,0];
		var x = "";
		
        if (typeof navigator.plugins != "undefined" && navigator.plugins.length > 0)
        {
	        // Navigator, firefox, mozilla

		navigator.plugins.refresh(false);

		var szDescription = "ArtistScope Plugin 5";
		var szVersionMatch = "Plugin 5 v";

		if (typeof navigator.plugins[szDescription] == "object")
	        {
	            x = navigator.plugins[szDescription].description;
	            ix = x.indexOf(szVersionMatch);
	            if (ix > -1)
	            	x = x.slice(ix + szVersionMatch.length);
	            else
	            	x = "";
	        }
		}
		else if (typeof window.ActiveXObject != "undefined")
		{
			// Internet explorer

			var y = null;

			try
			{
				y = new ActiveXObject("ARTISTSCOPE.ArtistScopeCtrl")
                x = y.GetVersion();
			}
			catch(t)
			{
			}
		}

		if (x.length > 0)
		{
           	ix1 = x.indexOf(".");
           	ix2 = x.indexOf(".", ix1 + 1);
	            	
           	if (ix1 != -1 && ix2 != -1)
           	{
            	AC[0] = parseInt(x.slice(0, ix1));
            	AC[1] = parseInt(x.slice(ix1 + 1, ix2));
            	AC[2] = parseInt(x.slice(ix2 + 1));
           	}
		}

        return AC;
	}

var arVersion = CopysafeVersionCheck();
var szNumeric = "" + arVersion[0] + "." + arVersion[1] + "." + arVersion[2];
	

if ((m_bWindows) && (m_bMicrosoft))
	{
	m_szPlugin = "OCX";
	if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3))
		{
		window.location=unescape(m_szDownloadIE);
		document.MM_returnValue=false;
		}
	}
else if ((m_bWindows) && (m_bNetscape))
	{
	m_szPlugin = "DLL";
	if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3))
		{
		window.location=unescape(m_szDownloadFX);
		document.MM_returnValue=false;
		}
	}
else 
	{
	window.location=unescape(m_szDownloadNo);
	document.MM_returnValue=false;
	}

		
//    // Extract the image width and height from the image name (example name: zulu580_0580_0386_C.class)
//
//    var nIndex = szImageName.lastIndexOf('_C.');
//    if (nIndex == -1)
//    {
//        // Strange filename that doesn't conform to the copysafe standard. Can't render it.
//        return;
//    }
//
//    var szWidth = szImageName.substring(nIndex - 9, nIndex - 5);
//    var szHeight = szImageName.substring(nIndex - 4, nIndex);

    var nWidth = width * 1;
    var nHeight = height * 1;


    // Expand width and height to allow for border

    var nBorder = m_szDefaultBorder * 1;
    nWidth = nWidth + (nBorder * 2);
    nHeight = nHeight + (nBorder * 2);

    return insertCopysafeImage(width, height, text_color, border_color, nBorder, loading_message, hyperlink, target, rest,m_szPlugin);
   
}

function insertCopysafeImage(nWidth, nHeight, szTextColor, szBorderColor, nBorder, szLoading, szLink, szTargetFrame, arFrames,m_szPlugin)
{
  var res='';
	if (m_bpDebugging == 2)
        { 
        res+="<textarea rows='27' cols='80'>"; 
        } 

    if ((m_szPlugin == "DLL") || (m_szPlugin == "OCX"))
    {
    var szObjectInsert = "";
    

    if (m_szPlugin == "DLL")
    {      
    	szObjectInsert = "type='application/x-artistscope-firefox5' codebase='" + wpcsw_plugin_url + "download_fx.php' ";
       res+="<ob" + "ject " + szObjectInsert + " width='" + nWidth + "' height='" + nHeight + "'>";
        if (m_bpProtectionLayer) {
        res+="<param name='ProtectionActivated' value='OnProtectionActivated()' />";
	 }
    }
    else if (m_szPlugin == "OCX")
    {
        szObjectInsert = "classid='CLSID:46C73251-78A3-43C8-BA64-A18B29314D69'";
        res+="<ob" + "ject id='CopysafeObject' " + szObjectInsert + " width='" + nWidth + "' height='" + nHeight + "'>";
    }


    res+="<param name='KeySafe' value='" + bool2String(m_bpKeySafe) + "' />";
    res+="<param name='CaptureSafe' value='" + bool2String(m_bpCaptureSafe) + "' />";
    res+="<param name='MenuSafe' value='" + bool2String(m_bpMenuSafe) + "' />";
    res+="<param name='RemoteSafe' value='" + bool2String(m_bpRemoteSafe) + "' />";
    
    res+="<param name='Style' value='ImageLink' />";
    res+="<param name='TextColor' value='" + paramValue(szTextColor, m_szDefaultTextColor) + "' />";
    res+="<param name='BorderColor' value='" + paramValue(szBorderColor, m_szDefaultBorderColor) + "' />";
    res+="<param name='Border' value='" + paramValue(nBorder, m_szDefaultBorder) + "' />";
    res+="<param name='Loading' value='" + paramValue(szLoading, m_szDefaultLoading) + "' />";
    res+="<param name='Label' value='' />";
    res+="<param name='Link' value='" + paramValue(szLink, m_szDefaultLink) + "' />";
    res+="<param name='TargetFrame' value='" + paramValue(szTargetFrame, m_szDefaultTargetFrame) + "' />";
    res+="<param name='Message' value='' />";   
    res+="<param name='FrameDelay' value='2000' />";
    res+="<param name='FrameCount' value='1' />";
    if (m_bpDebugging == 0){
  res="<img src='" + m_szImageFolder +"image_placeholder.jpg' width='300px' height='300px' />";
    }
    else
    {
    res+="<param name='Frame000' value='" + m_szImageFolder + arFrames + "' />";        
    }

    res+="</ob" + "ject />"; 

    if (m_bpDebugging == 2)
        { res+="</textarea />"; }
    }

return res;


   
}







