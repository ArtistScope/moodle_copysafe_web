<?php  // $Id: view.php,v 1.6.2.3 2009/04/17 22:06:25 skodak Exp $

/**
 * This page prints a particular instance of CopysafeWeb
 *
 * @author  ArtistScope
 * @version $Id: view.php,v 1.6.2.3 2009/04/17 22:06:25 skodak Exp $
 * @package mod/CopysafeWeb
 */

    require_once('../../config.php');
    require_once('lib.php');

$id = optional_param('id', 0, PARAM_INT); // course_module ID, or
$a  = optional_param('a', 0, PARAM_INT);  // newmodule instance ID

if ($id) {
    if (! $cm = get_coursemodule_from_id('CopysafeWeb', $id)) {
        error('Course Module ID was incorrect');
    }

    if (! $course = get_record('course', 'id', $cm->course)) {
        error('Course is misconfigured');
    }

    if (! $newmodule = get_record('CopysafeWeb', 'id', $cm->instance)) {
        error('Course module is incorrect');
    }

} else if ($a) {
    if (! $newmodule = get_record('CopysafeWeb', 'id', $a)) {
        error('Course module is incorrect');
    }
    if (! $course = get_record('course', 'id', $newmodule->course)) {
        error('Course is misconfigured');
    }
    if (! $cm = get_coursemodule_from_instance('CopysafeWeb', $newmodule->id, $course->id)) {
        error('Course Module ID was incorrect');
    }

} else {
    error('You must specify a course_module ID or an instance ID');
}

require_login($course, true, $cm);

add_to_log($course->id, "CopysafeWeb", "view", "view.php?id=$cm->id", "$newmodule->id");

/// Print the page header
$strnewmodules = get_string('modulenameplural', 'CopysafeWeb');
$strnewmodule  = get_string('modulename', 'CopysafeWeb');

$navlinks = array();
$navlinks[] = array('name' => $strnewmodules, 'link' => "index.php?id=$course->id", 'type' => 'activity');
$navlinks[] = array('name' => format_string($newmodule->name), 'link' => '', 'type' => 'activityinstance');

$navigation = build_navigation($navlinks);

print_header_simple(format_string($newmodule->name), '', $navigation, '', '', true,
              update_module_button($cm->id, $course->id, $strnewmodule), navmenu($course, $cm));

/// Print the main part of the page

echo 'YOUR CODE GOES HERE';


/// Finish the page
print_footer($course);

?>
