<?php get_header(); ?>

<main class="single-project">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="project-content">
            <?php the_content(); ?>
        </div>
        <?php if (has_post_thumbnail()) : ?>
            <div class="project-image">
                <?php the_post_thumbnail(); ?>
            </div>
        <?php endif; ?>
    <?php endwhile; endif; ?>
</main>

<?php get_footer(); ?>
