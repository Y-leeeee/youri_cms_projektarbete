<?php
/*
Template Name: Projects
*/
get_header(); ?>

<main class="projects-page">
    <h1>My Projects</h1>
    <ul id="projects-list" class="projects-list"></ul>

    <script>
        // Fetch Projects via WordPress REST API
        fetch('http://localhost:8888/cms_projektarbete/wp-json/wp/v2/projects')
            .then(response => response.json())
            .then(data => {
                const projectsList = document.getElementById('projects-list');
                if (data.length > 0) {
                    data.forEach(project => {
                        const projectItem = document.createElement('li');
                        projectItem.classList.add('project-item');

                        // Create project title and link
                        const projectLink = document.createElement('a');
                        projectLink.href = `/portfolio-projects/${project.slug}`;
                        projectLink.textContent = project.title.rendered;

                        // Add project thumbnail
                        if (project._embedded && project._embedded['wp:featuredmedia']) {
                            const projectImage = document.createElement('img');
                            projectImage.src = project._embedded['wp:featuredmedia'][0].source_url;
                            projectImage.alt = project.title.rendered;
                            projectItem.appendChild(projectImage);
                        }

                        // Append link to project item
                        projectItem.appendChild(projectLink);

                        // Append project item to the list
                        projectsList.appendChild(projectItem);
                    });
                } else {
                    projectsList.innerHTML = '<p>No projects found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                document.getElementById('projects-list').innerHTML = '<p>Error loading projects. Please try again later.</p>';
            });
    </script>
</main>

<?php get_footer(); ?>
