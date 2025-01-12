export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/projects?slug=${params.slug}`
  );
  const project = await res.json();

  if (!project.length) {
    return <h1>Project not found</h1>;
  }

  const details = project[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{details.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: details.content.rendered }} />
    </div>
  );
}
