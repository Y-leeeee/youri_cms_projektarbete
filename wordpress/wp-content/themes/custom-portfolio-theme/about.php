<?php
/* Template Name: About Me */
get_header(); ?>

<main class="about-page">
    <h1><?php the_title(); ?></h1>

    <!-- Profile Picture -->
    <?php if ($profile_picture = get_field('profile_picture')) : ?>
        <img src="<?php echo esc_url($profile_picture['url']); ?>" alt="<?php echo esc_attr($profile_picture['alt']); ?>" class="profile-picture">
    <?php endif; ?>

    <!-- Education Section -->
    <section class="education">
        <h2>Education</h2>
        <ul>
            <?php
            
            $total_education_entries = 3; 

            
            for ($i = 1; $i <= $total_education_entries; $i++) :
                $institution = get_field('institution_name_' . $i);
                $degree = get_field('degree_' . $i);
                $completion_year = get_field('completion_year_' . $i);

            
                if ($institution) : ?>
                    <li>
                        <strong><?php echo $institution; ?></strong> - <?php echo $degree; ?> (<?php echo $completion_year; ?>)
                    </li>
                <?php endif;
            endfor;
            ?>
        </ul>
    </section>

    <!-- Work Experience Section -->
    <section class="work-experience">
    <h2>Work Experience</h2>
    <ul>
        <?php
       
        $i = 1;

       
        while (get_field('job_title_' . $i)) :
            $job_title = get_field('job_title_' . $i);
            $company = get_field('company_' . $i);
            $years_of_service = get_field('years_of_service_' . $i);
        ?>
            <li>
                <strong><?php echo $job_title; ?></strong> at <?php echo $company; ?> (<?php echo $years_of_service; ?>)
            </li>
        <?php
            $i++; 
        endwhile;
        ?>
    </ul>
</section>

</main>

<?php get_footer(); ?>
