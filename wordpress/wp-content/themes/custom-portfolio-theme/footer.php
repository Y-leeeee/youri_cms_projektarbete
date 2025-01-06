<footer class="site-footer">
    <p>&copy; <?php echo date('Y'); ?> - <?php bloginfo('name'); ?></p>
    <nav class="footer-navigation">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'footer-menu',
            'menu_class' => 'footer-menu',
        ));
        ?>
    </nav>
    <div class="social-links">
        <!-- Email -->
        <a href="mailto:lyr890802@gmail.com" class="social-link" aria-label="Email">
            <i class="fa-solid fa-envelope"></i>
        </a>
        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/your-linkedin-profile" class="social-link" target="_blank" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
        </a>
        <!-- GitHub -->
        <a href="https://github.com/your-github-profile" class="social-link" target="_blank" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
        </a>
    </div>
</footer>
