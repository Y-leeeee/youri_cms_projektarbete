export default async function HomePage() {
  const pageRes = await fetch(
    "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/pages?slug=homepage"
  );
  const pageData = await pageRes.json();

  if (!pageData.length || !pageData[0]?.content?.rendered) {
    return <h1>No content available for the Homepage</h1>;
  }

  const page = pageData[0];

  let profilePhotoUrl = null;
  if (page.acf.profile_photo) {
    const mediaRes = await fetch(
      `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${page.acf.profile_photo}`
    );
    const mediaData = await mediaRes.json();
    profilePhotoUrl = mediaData?.source_url;
  }

  return (
    <div>
      <h1>{page.title.rendered}</h1>
      {profilePhotoUrl && (
        <img
          src={profilePhotoUrl}
          alt="Profile Photo"
          style={{ maxWidth: "200px", borderRadius: "50%" }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
