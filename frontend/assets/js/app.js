async function fetchProjects() {
  const apiUrl =
    "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects";

  try {
    const response = await fetch(apiUrl);
    const projects = await response.json();

    const projectsContainer = document.getElementById("projects-container");

    for (const project of projects) {
      // Fetch the featured media
      let thumbnail = "";
      if (project.featured_media) {
        const mediaResponse = await fetch(
          `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${project.featured_media}`
        );
        const media = await mediaResponse.json();
        thumbnail = media.source_url; // URL of the image
      }

      // Create project card
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-card");
      projectDiv.innerHTML = `
                <img src="${thumbnail}" alt="${project.title.rendered}" class="thumbnail" />
                <h2>${project.title.rendered}</h2>
                <p>${project.content.rendered}</p>
                <a href="${project.link}">Read More</a>
            `;
      projectsContainer.appendChild(projectDiv);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

fetchProjects();
