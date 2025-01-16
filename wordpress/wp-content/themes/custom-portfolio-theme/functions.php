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
        'show_in_rest' => true,  
        'rest_base' => 'projects',  
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

function add_project_categories() {
    register_taxonomy_for_object_type('category', 'projects');
    register_taxonomy_for_object_type('post_tag', 'projects');
}
add_action('init', 'add_project_categories');

function register_testimonials_post_type() {
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial',
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
    ));
}
add_action('init', 'register_testimonials_post_type');

function register_skills_post_type() {
    register_post_type('skills', array(
        'labels' => array(
            'name' => 'Skills',
            'singular_name' => 'Skill',
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'custom-fields'),
    ));
}
add_action('init', 'register_skills_post_type');

function register_services_post_type() {
    register_post_type('services', array(
        'labels' => array(
            'name' => 'Services',
            'singular_name' => 'Service',
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields', 'thumbnail'),
    ));
}
add_action('init', 'register_services_post_type');
