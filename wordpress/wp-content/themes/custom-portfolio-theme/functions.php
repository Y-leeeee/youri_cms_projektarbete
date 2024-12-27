<?php
function theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main-menu' => 'Main Menu'
    ));
}
add_action('after_setup_theme', 'theme_setup');

function register_projects_post_type() {
    $args = array(
        'public' => true,
        'label' => 'Projects',
        'supports' => array('title', 'editor', 'thumbnail'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'projects'),
    );
    register_post_type('projects', $args);
}
add_action('init', 'register_projects_post_type');

function register_project_categories() {
    $args = array(
        'labels' => array(
            'name' => 'Categories',
            'singular_name' => 'Category'
        ),
            'hierarchical' => true,
            'public' => true,
            'rewrite' => array('slug' => 'categories'),
    );
    register_taxonomy('categories', 'projects', $args);
}
add_action('init', 'register_project_categories');