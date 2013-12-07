<?php // $Id: version.php,v 1.5.2.2 2009/03/19 12:23:11 mudrd8mz Exp $

/**
 * Code fragment to define the version of newmodule
 * This fragment is called by moodle_needs_upgrading() and /admin/index.php
 *
 * @author  Your Name <aje4u2i@gmail.com>
 * @version $Id: version.php,v 1.5.2.2 2009/03/19 12:23:11 mudrd8mz Exp $
 * @package mod/newmodule
 */

$module->version  = 2013120800;  // The current module version (Date: YYYYMMDDXX)
$module->requires  = 2013070800;    // Requires this Moodle version.
$module->cron     = 0;           // Period for cron to check this module (secs)

?>
