import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';

export default function Post({ postData }) {
  const { title, id, date, contentHtml } = postData;
  return <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <article>
      <h1>{title}</h1>
      <div className="date">
        <Date dateString={date} className='date' /></div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      <style jsx>
        {`
      .date {
        color: darkgray;
      }
      `}
      </style>
    </article>
  </Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  return {
    paths: getAllPostIds(),
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  return {
    props: {
      postData: await getPostData(params.id)
    }
  }
}