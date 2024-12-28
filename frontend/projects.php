<?php get_header(); ?>
<main>
    <h1>My Projects</h1>
    <ul>
        <?php
        $projects = new WP_Query(array(
            'post_type' => 'projects',
            'posts_per_page' => -1,
        ));

        if ($projects->have_posts()) {
            while ($projects->have_posts()) {
                $projects->the_post();
        ?>
                <li>
                    <a href="<?php echo esc_url(get_permalink()); ?>">
                        <?php the_title(); ?>
                    </a>
                    <?php if (has_post_thumbnail()) : ?>
                        <img src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php the_title(); ?>">
                    <?php endif; ?>
                </li>
        <?php
            }
            wp_reset_postdata(); // Restore global post data
        } else {
            echo '<p>No projects found.</p>';
        }
        ?>
    </ul>
</main>
<?php get_footer(); ?>
