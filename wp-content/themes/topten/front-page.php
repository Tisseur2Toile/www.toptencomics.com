<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage FoundationPress
 * @since FoundationPress 1.0.0
 */

get_header(); ?>

<div id="page" role="main">
	<div class=" row">


		<div class="small-6 columns small-centered">
			<h1>Cherche trouve...</h1>
			<?php get_search_form(); ?>
			<a href="#" class="button">Incription</a>
			<a href="#" class="button">Connexion</a>
			<br><br><br>
			<a href="#" class="myClick">YEAH...</a>
		</div>
		<div class="resultats">

		</div>






	</div>

</div>

<?php get_footer(); ?>
