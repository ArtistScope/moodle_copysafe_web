<?php  //$Id: settings.php,v 1.1.2.2 2007/12/19 17:38:41 skodak Exp $
defined('MOODLE_INTERNAL') || die;
//require_once($CFG->dirroot.'/mod/copysafeweb/set.php');

//$settings->add(new admin_setting_heading('CopysafeWeb_method_heading', 'List of Uploaded Class files',
               //get_wpcsw_uploadfile_list()));


$settings->add(new admin_setting_heading('CopysafeWeb_normal_heading', 'Settings',
                   'Default settings applied to all protected pages:'));



$options = array();
$options[0]  = 'Demo Mode';
$options[1] = 'Licensed';
$options[2] = 'Debugging Mode';
$settings->add(new admin_setting_configselect('CopysafeWeb_mode','Mode:',
                   '','', $options));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allowie', 'Allow IE:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allowfirefox', 'Allow Firefox:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allowchrome', 'Allow Chrome:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allownavigator', 'Allow Navigator:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allowopera', 'Allow Opera:',
                   ''));

$settings->add(new admin_setting_configcheckbox('CopysafeWeb_allowsafari', 'Allow Safari:',
                   ''));

?>
