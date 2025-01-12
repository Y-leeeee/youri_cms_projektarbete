export default async function ProjectsPage() {
  const res = await fetch(
    "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects?_embed"
  );
  const projects = await res.json();

  if (!projects.length) {
    return <h1>No projects found</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => {
          const featuredImage =
            project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <li key={project.id} className="border p-4 rounded shadow">
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={project.title.rendered}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">
                {project.title.rendered}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: project.content.rendered }}
              />
              <a
                href={`/projects/${project.slug}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
