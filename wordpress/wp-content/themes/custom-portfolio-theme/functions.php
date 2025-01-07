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
        'rewrite' => array('slug' => 'portfolio-projects'),
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

function enqueue_theme_styles() {
    wp_enqueue_style('main-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'enqueue_theme_styles');

function enqueue_font_awesome() {
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        array(), // No dependencies
        '6.5.0'   // Version number
    );
}
add_action('wp_enqueue_scripts', 'enqueue_font_awesome');

function register_menus() {
    register_nav_menus(array(
        'header-menu' => 'Header Menu',
        'footer-menu' => 'Footer Menu',
    ));
}
add_action('init', 'register_menus');


