<?php
// Custom Taxonomy....
function comics_post_types() {
// --> Comics
         $labels_comics_post_type_array = array(
             'name'                  =>  __('Comics', 'topten'),
             'singular_name'         =>  __('Comics', 'topten'),
             'add_new'               =>  __('Ajouter un comics', 'topten'),
             'add_new_item'          =>  __('Ajouter un comics', 'topten'),
             'edit_item'             =>  __('Editer le comics', 'topten'),
             'new_item'              =>  __('Nouveau comics', 'topten'),
             'view_item'             =>  __('Visualiser le comics', 'topten'),
             'search_items'          =>  __('Rechercher un comics', 'topten'),
             'not_found'             =>  __('Aucun comics', 'topten'),
             'not_found_in_trash'    =>  __('Aucun comics dans la corbeille', 'topten'),
             'parent_item_colon'     =>  __('--', 'topten'),
             'menu_name'             =>  __('Comics', 'topten')
         );
         $supports_comics_post_type_array = array(
             'title',
             'editor',
             'thumbnail',
             'excerpt'
         );
         $rewrite_comics_post_type_array = array(
             'slug'          =>  _x('comic-book', 'Pour les collections', 'topten'),
             'with_front'    =>  false,
             'feeds'         =>  true,
             'pages'         =>  true
         );
         $args_comics_post_type_array = array(
             'labels'                =>  $labels_comics_post_type_array,
             'description'           =>  __('Contenu complet Comics', 'topten'),
             'public'                =>  true,
             'publicly_queryable'    =>  true,
             'menu_position'         =>  50,
             'menu_icon'             =>  '',
             'capability_type'       =>  'post',
             'supports'              =>  $supports_comics_post_type_array,
             'rewrite'               =>  $rewrite_comics_post_type_array,
             'show_in_nav_menus'     =>  true,
             'hierarchical'          =>  true,
             'has_archive'           =>  true
         );
         register_post_type('comics', $args_comics_post_type_array);

        // --> COMICS : Series concernees
     $labels_serie     = array(
         'name'              => _x( 'Serie', 'taxonomy general name' ),
         'singular_name'     => _x( 'Serie', 'taxonomy singular name' ),
         'search_items'      => __( 'Rechercher une serie' ),
         'all_items'         => __( 'Toutes les series' ),
         'edit_item'         => __( 'Editer une serie' ),
         'update_item'       => __( 'Mettre à jour une serie' ),
         'add_new_item'      => __( 'Ajouter une serie' ),
         'new_item_name'     => __( 'Nouvelle serie' ),
         'menu_name'         => __( 'Séries' ),
     );
     //if (ICL_LANGUAGE_CODE)
     $args_serie     = array(
         'hierarchical'      => false,
         'labels'            => $labels_serie,
         'show_ui'           => true,
         'show_admin_column' => true,
         'query_var'         => true,
         'rewrite'           => array( 'slug' => 'series' ),
     );

     register_taxonomy( 'series', array( 'comics'), $args_serie );


}
add_action('init', 'comics_post_types', 1);
