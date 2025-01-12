export default async function HomePage() {
  const res = await fetch(
    "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/pages?slug=homepage"
  );
  const data = await res.json();

  if (!data.length || !data[0]?.content?.rendered) {
    return <h1>No content available for the Homepage</h1>;
  }

  const page = data[0];

  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
