<?php
/* Template Name: Homepage */
get_header(); ?>

<main class="home-page">
    <section class="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>Hello! I’m Youri, a frontend developer.</p>
        <a href="<?php echo get_permalink(get_page_by_path('projects')); ?>" class="cta-button">View My Work</a>
    </section>
</main>

<?php get_footer(); ?>
