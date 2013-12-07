<?php

function wpcsw_get_config($param){
     global $DB,$CFG;
     $res=array();
     //$result = $DB->get_records_list('config', 'name', array( 'CopysafeWeb_uploadfolder','CopysafeWeb_uploadfolder','CopysafeWeb_mode','CopysafeWeb_allowie','CopysafeWeb_allowfirefox','CopysafeWeb_allowchrome','CopysafeWeb_allownavigator','CopysafeWeb_allowopera','CopysafeWeb_allowsafari'), null, 'value');
     $result = $DB->get_records_sql('SELECT * FROM {config} WHERE name LIKE ?', array('CopysafeWeb%'));
     //print_r($result);
     foreach ($result as $key=>$val)
     {
        $res[$val->name]=$val->value;
     }
     
     echo json_encode($res).'~'.$pluginurl = new moodle_url('/mod/copysafeweb/').'~'.$uploadurl = new moodle_url('/mod/copysafeweb/copysafewebimage/');
}
function wpcsw_get_parameters($param){
     global $DB,$CFG;
	//$postid = $_POST["post_id"] ;
	$filename = trim($param["filename"]) ;
	
	$result = $DB->get_record_sql('SELECT * FROM {copysafeweb_settings} WHERE name = ?', array($filename));
        if(empty($result)){
        $result = wpcsw_get_first_class_settings() ;
        extract($result ) ;
        $key_safe = ($key_safe) ? 1 : 0 ;
	$capture_safe = ($capture_safe) ? 1 : 0 ;
	$menu_safe = ($menu_safe) ? 1 : 0 ;
	$remote_safe = ($remote_safe) ? 1 : 0 ;
         $params = 	" border='" . $border . "'" . 
			" border_color='" . $border_color . "'" .
			" key_safe='" . $key_safe . "'" .
			" capture_safe='" . $capture_safe . "'" .
			" menu_safe='" . $menu_safe . "'" .
			" remote_safe='" . $remote_safe . "'" .	
			" text_color='" . $text_color . "'" . 
			" loading_message='" . $loading_message . "'" . 
			" hyperlink='" . $hyperlink . "'" .	 
			" target='" . $target . "'" .
                        " width='" . $width . "'" .
                        " height='" . $height . "'" ;
        }
        else
        {
            $params = 	" border='" . $result->border . "'" . 
			" border_color='" . $result->border_color . "'" .
			" key_safe='" . $result->key_safe . "'" .
			" capture_safe='" . $result->capture_safe . "'" .
			" menu_safe='" . $result->menu_safe . "'" .
			" remote_safe='" . $result->remote_safe . "'" .	
			" text_color='" . $result->text_color . "'" . 
			" loading_message='" . $result->loading_message . "'" . 
			" hyperlink='" . $result->hyperlink . "'" .	 
			" target='" . $result->target . "'" .
                        " width='" . $result->width . "'" .
                        " height='" . $result->height . "'" ;
            
        }
	

	return $params ;
}

function wpcsw_get_first_class_settings(){
	$settings = array(				
				'key_safe'        => 0,
				'capture_safe'    => 0,
				'menu_safe'       => 0, 
				'remote_safe'     => 0,		
	            		'border'          => 0,
	            		'border_color'    => '000000',
	            		'text_color'      => 'FFFFFF',
	            		'loading_message' => 'Image loading...',
	            		'hyperlink'       => '',
		     		'target'          => "_top",
                                'width'          => 50,
                                'height'          => 50,
			) ;
	return 	$settings ;	
}

function wpcsw_file_upload($param){
	$file_error 	= $param["error"] ;  
	$file_errors = array( 0 => "There is no error, the file uploaded with success" ,
                          1 => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
                          2 => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form" ,
                          3 => "The uploaded file was only partially uploaded",
                          4 => "No file was uploaded" ,
                          6 => "Missing a temporary folder" ,
                          7 => "Upload directory is not writable"
                   );
                   
	if ( $file_error == 0 ){
		$msg = '<div class="updated"><p><strong>'.'File Uploaded. You must save "File Details" to insert post'.'</strong></p></div>';
	}else{
		$msg = '<div class="error"><p><strong>'.'Error'.'!</strong></p><p>'.$file_errors[$file_error].'</p></div>';
	}
    return $msg ;
}

function wpcsw_file_search($param){
	// get selected file details
	if (@!empty($param['search']) || @!empty($param['post_id'])) {
    	
		$postid = $param['post_id'] ;
		$search = trim($param["search"]);
    	
		$files = _get_wpcsw_uploadfile_list() ;

    	$result = false ;
    	foreach ($files as $file)
    		if( $search == trim($file["filename"]) )$result = true ;
    	    	
		if( !$result )return "<hr /><h2>No found file</h2>" ;
				
		$file_options  = wpcsw_get_first_class_settings() ;
	                    
//	    $wpcsw_options = get_option( 'wpcsw_settings' );
//	    if( $wpcsw_options["classsetting"][$postid][$search] )
//	    	$file_options = $wpcsw_options["classsetting"][$postid][$search] ;
//	    
		extract( $file_options, EXTR_OVERWRITE );
		
	    $str = "<hr />
	    		<div class='icon32' id='icon-file'><br /></div>
		        <h2>Page Settings</h2>
		        <div>
	    			<table cellpadding='0' cellspacing='0' border='0' >
	  					<tbody id='wpcsw_setting_body'> 
							  <tr>
							    <td align='left' width='50'>&nbsp;</td>
							    <td align='left' width='40'><img src='./images/help-24-30.png' border='0' alt='Border thickness in pixels. For no border set 0.' /></td>						    
    							<td align='left'>Border size:</td>
							    <td> 
							      <input name='border' id='wpcsw_border' type='text' value='$border' size='3' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Color of the border and image backround area. For example use FFFFFF for white and 000000 is for black... without the # symbol.' /></td>
							    <td align='left'>Border color:</td>
							    <td> 
							      <input name='border_color' id='wpcsw_border_color' type='text' value='$border_color' size='7' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Color of the text message that is displayed in the image area sas the image downloads.' /></td>
							    <td align='left'>Text color:</td>
							    <td> 
							      <input name='text_color' id='wpcsw_text_color' type='text' value='$text_color' size='7' />
							    </td>
							  </tr>
							<tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable Printscreen and screen capture when the class image loads.'></td>
							    <td align='left'>Prevent Capture:</td>
							    <td> 
							      <input name='capture_safe' type='checkbox' value='1' $capture_safe>
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable use of the keyboard when the class image loads.' /></td>
							    <td align='left'>Prevent Keyboard:</td>
							    <td> 
							      <input name='key_safe' id='wpcsw_key_safe' type='checkbox' value='1' $key_safe>
							    </td>
							  </tr>
							  
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to disable use of browser menus. This option is browser dependent.'></td>
							    <td align='left'>Prevent Menus:</td>
							    <td> 
							      <input name='menu_safe' type='checkbox' value='1' $menu_safe>
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Check this box to prevent viewing by remote or virtual computers when the class image loads.'></td>
							    <td align='left'>Prevent Remote:</td>
							    <td> 
							      <input name='remote_safe' type='checkbox' value='1' $remote_safe>
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Set the message to display as this class image loads.' /></td>
							    <td align='left'>Loading message:&nbsp;</td>
							    <td> 
							      <input name='loading_message' id='wpcsw_loading_message' type='text' value='$loading_message' size='30' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Add a link to another page activated by clciking on the image, or leave blank for no link.' /></td>
							    <td align='left'>Hyperlink:</td>
							    <td> 
							      <input value='$hyperlink' name='hyperlink' id='wpcsw_hyperlink' type='text' size='30' />
							    </td>
							  </tr>
							  <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Set the target frame for the hyperlink, for example _top' /></td>
							    <td align='left'>Target frame:</td>
							    <td> 
							      <input value='$target' name='target' id='wpcsw_target' type='text' size='15' />
							    </td>
							  </tr>
                                                            <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Set the width of image ex:100' /></td>
							    <td align='left'>Width:</td>
							    <td> 
							      <input value='$width' name='width' id='wpcsw_width' type='text' size='15' />
							    </td>
							  </tr>
                                                            <tr>
							    <td align='left'>&nbsp;</td>
							    <td align='left'><img src='./images/help-24-30.png' border='0' alt='Set the height of image ex:100'  /></td>
							    <td align='left'>Height:</td>
							    <td> 
							      <input value='$height' name='height' id='wpcsw_height' type='text' size='15' />
							    </td>
							  </tr>
						</tbody> 
					</table>
			        <p class='submit'>
			            <input type='button' value='Save' class='button-primary' id='setting_save' name='submit' />
			            <input type='button' value='Cancel' class='button-primary' id='cancel' />
			        </p>
        	</div>" ;
		return $str ;
	}
}

function wpcsw_setting_save($param){
    global $DB,$CFG;
	$postid = $param["post_id"] ;
	$name = trim($param["nname"]) ;
	$data = (array)json_decode(stripcslashes($param["set_data"])) ;
 

$record = new stdClass();
$record->name= $name;
$record->postid= $postid;
$record->border=$data['border'];
$record->border_color=$data['border_color'];
$record->text_color= $data['text_color'];
$record->loading_message= $data['loading_message'];
$record->key_safe= $data['key_safe'];
$record->capture_safe= $data['capture_safe'];
$record->menu_safe= $data['menu_safe'];
$record->remote_safe= $data['remote_safe'];
$record->hyperlink= $data['hyperlink'];
$record->target= $data['target'];
$record->width= $data['width'];
$record->height= $data['height'];

$result = $DB->get_record_sql('SELECT * FROM {copysafeweb_settings} WHERE name = ?', array($name));
if($result->postid){
   $record->id      = $result->id;
   $DB->update_record('copysafeweb_settings', $record);  
}
    else
$DB->insert_record('copysafeweb_settings', $record);

    $msg = '<div class="updated fade">
    			<strong>'.__('File Options Are Saved').'</strong><br />
    			<div style="margin-top:5px;"><a href="#" alt="'.$name.'" class="button-secondary sendtoeditor"><strong>Insert file to editor</strong></a></div>
		    </div>';
    return $msg ;
}

function _get_wpcsw_uploadfile_list(){
	$listdata = array() ;
        global $CFG, $DB;
	$file_list = scandir($CFG->dirroot.'/mod/copysafeweb/copysafewebimage/');
	foreach ($file_list as $file) {
		if( $file == "." || $file == "..")continue ;		
		$file_path = $CFG->dirroot.'/mod/copysafeweb/copysafewebimage/' . $file ;		
		if( filetype($file_path) != "file" )continue ; 
		$ext = end(explode('.', $file));
		if( $ext != "class" )continue ;
		
		$file_path = $CFG->dirroot.'/mod/copysafeweb/copysafewebimage/'. $file ;
		$file_name = $file;
		$file_size = filesize($file_path) ;
		$file_date = filemtime ($file_path) ;
		
		if ( round ( $file_size/1024 ,0 )> 1 ) {
            $file_size = round ( $file_size/1024, 0 );
            $file_size = "$file_size KB";
        } else {
            $file_size = "$file_size B";
        }
        
        $file_date = date("n/j/Y g:h A", $file_date);
                
		$listdata[] = array(
					"filename" => $file_name,
					"filesize" => $file_size,
					"filedate" => $file_date
				) ;
	}
	return $listdata ;
}

function get_wpcsw_uploadfile_list(){
	
	$files = _get_wpcsw_uploadfile_list() ;
$table="<table><tr><th>File</th><th>Size</th><th>Date/Time</th></tr>";
	foreach ($files as $file) {
		//$link = "<div class='row-actions'>
		//			<span><a href='#' alt='{$file["filename"]}' class='setdetails row-actionslink' title=''>Setting</a></span>&nbsp;|&nbsp;
		//			<span><a href='#' alt='{$file["filename"]}' class='sendtoeditor row-actionslink' title=''>Insert to post</a></span>											
		//		</div>" ;
        // prepare table row
        $table.= "<tr><td>{$file["filename"]}</td><td width='50px'>{$file["filesize"]}</td><td width='130px'>{$file["filedate"]}</td></tr>";
	}
	
	if( !$table ){
		 $table.= '<tr><td colspan="3">'.'No file uploaded yet.'.'</td></tr>';
	}
	$table.="</table>";
	return $table ;
}

    

?>
