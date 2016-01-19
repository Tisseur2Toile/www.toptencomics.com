<?php
/**
 * The sidebar containing the main widget area
 *
 * @package WordPress
 * @subpackage FoundationPress
 * @since FoundationPress 1.0.0
 */

?>
<aside class="sidebar">
	<?php do_action( 'foundationpress_before_sidebar' ); ?>
	<?php if(is_user_logged_in()): ?>
		<?php dynamic_sidebar( 'sidebar-widgets-connecte' ); ?>

		<a href="<?php echo wp_logout_url( home_url('/') ); ?>" class="button expand">Déconnexion</a>

		
	<?php endif; ?>
	<?php dynamic_sidebar( 'sidebar-widgets' ); ?>
	<?php do_action( 'foundationpress_after_sidebar' ); ?>
</aside>
