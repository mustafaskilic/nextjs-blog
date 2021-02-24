import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import * as React from "react";
import toast from "../components/Toast";


 

 const Home=({ allPostsData }) =>{

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <div onClick={() => notify("success", "Hello!")} className="message">
        <p>Success Message</p>
      </div>
      <div onClick={() => notify("error", "Error!")} className="message">
        <p>Error Message</p>
      </div>
      <div onClick={() => notify("info", "Info!")} className="message">
        <p>Info Message</p>
      </div>
      <div onClick={() => notify("warning", "Warning!")} className="message">
        <p>Warning Message</p>
      </div>
      <div onClick={dismiss} className="message">
        <p>Dissmiss All Messages</p>
      </div>
      <style jsx>{`
        .message {
          cursor: pointer;
          font: 15px Helvetica, Arial, sans-serif;
          background: #eee;
          padding: 20px;
          text-align: center;
          transition: 100ms ease-in background;
          margin: 10px;
        }
        .message:hover {
          background: #ccc;
        }
      `}</style>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


export default Home;

