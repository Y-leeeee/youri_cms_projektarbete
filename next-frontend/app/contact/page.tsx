// app/contact/page.tsx
import React from "react";

// Define the expected structure of the contact page data
interface ContactData {
  title: { rendered: string };
  content: { rendered: string };
}

const ContactPage = ({ contactData }: { contactData: ContactData }) => {
  return (
    <div>
      <h1>{contactData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: contactData.content.rendered }} />
    </div>
  );
};

// Fetch data at build time using getStaticProps
export async function getStaticProps() {
  try {
    const res = await fetch(
      "http://yourilee.42web.io/wp-json/wp/v2/pages?slug=contact"
    );
    const data = await res.json();

    return {
      props: {
        contactData: data[0] || null, // Pass the fetched data as props
      },
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      props: {
        contactData: null,
      },
    };
  }
}

export default ContactPage;
