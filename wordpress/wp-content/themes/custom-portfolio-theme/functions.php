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
    register_post_type('projects', array(
        'labels' => array(
            'name' => 'Projects',
            'singular_name' => 'Project',
        ),
        'public' => true,
        'show_in_rest' => true,  // This line enables the REST API support
        'rest_base' => 'projects',  // You can set a custom base for the route
        'supports' => array('title', 'editor', 'thumbnail'),
    ));
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

function add_project_url_to_rest($response, $post, $request) {
    if ($post->post_type === 'projects') {
        $project_url = get_field('project_url', $post->ID);
        if ($project_url) {
            $response->data['acf']['project_url'] = $project_url;
        }
    }
    return $response;
}
add_filter('rest_prepare_projects', 'add_project_url_to_rest', 10, 3);

function add_about_me_fields_to_rest($response, $post, $request) {
    if ($post->post_type === 'page' && get_the_title($post->ID) === 'About') {
        $acf_fields = get_fields($post->ID);
        if ($acf_fields) {
            $response->data['acf'] = $acf_fields;
        }
    }
    return $response;
}
add_filter('rest_prepare_page', 'add_about_me_fields_to_rest', 10, 3);
