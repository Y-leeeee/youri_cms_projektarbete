<?php
function theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main-menu' => 'Main Menu',
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
        'show_in_rest' => true, // Enable REST API support
    );
    register_post_type('projects', $args);
}
add_action('init', 'register_projects_post_type');

function add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', 'add_cors_headers');
});

add_action('template_redirect', function () {
    if (!is_admin() && !defined('REST_REQUEST')) {
        wp_redirect(home_url('/'));
        exit;
    }
});
