import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { encode } from '../utils/helpers';

const Subscribe = () => {
  const [name, setName] = React.useState(``);
  const [lastname, setLastName] = React.useState(``);
  const [email, setEmail] = React.useState(``);
  const [status, setStatus] = React.useState(`READY`);

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  return (
    <form
      name="mailing-list"
      data-netlify={true}
      data-netlify-honeypot="lastname"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        try {
          const res = await fetch(`/`, {
            method: `POST`,
            headers: { [`Content-Type`]: `application/x-www-form-urlencoded` },
            body: encode({ [`form-name`]: `mailing-list`, name, lastname, email }),
          });
          if (res.status === 200) setStatus(`DONE`);
          else {
            setStatus(`ERROR`);
          }
        } catch (err) {
          console.log(err);
          setStatus(`ERROR`);
        }
      }}
    >
      <div className="mb-8 px-6 py-8 dark:bg-purple-900 bg-opacity-100 dark-bg-opacity-25 bg-purple-100 rounded-md">
        <h3 className="m-0">Hop right in 🏄‍♀️</h3>
        {status === 'READY' && (
          <div className="flex mt-4 gap-y-2 md:gap-x-2 md:gap-y-0 flex-col md:flex-row">
            <input
              id="name"
              autoFocus
              autoComplete="name"
              name="name"
              type="text"
              className="px-3 py-1 dark:bg-purple-800 dark-bg-opacity-25 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              id="last-name"
              name="last-name"
              type="text"
              hidden
              className="px-3 py-1 dark:bg-purple-800 dark-bg-opacity-25 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
              value={lastname}
              onChange={handleLastNameChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="px-3 py-1 dark:bg-purple-800 dark-bg-opacity-25 bg-purple-200 placeholder-purple-400 text-base rounded flex-1"
              placeholder="yourname@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="submit"
              className="dark:bg-purple-50 bg-purple-900 dark:text-purple-900 text-purple-50 text-xs font-bold px-6 py-2 md:py-0 rounded"
            >
              JOIN
            </button>
          </div>
        )}
        {status === `SUBMITTING` ? <p className="m-0 text-center w-full">Submitting 🙇‍♂️</p> : null}
        {status === `DONE` ? (
          <p className="m-0 text-center w-full">You're in. Looking for the next Tuesday 🎉</p>
        ) : null}
        {status === `ERROR` ? (
          <p className="m-0 text-center w-full text-sm">
            Something went wrong. Could you refresh page and retry? 🙊
          </p>
        ) : null}
      </div>
    </form>
  );
};

const HomePage = ({ location }) => {
  return (
    <>
      <Layout location={location}>
        <SEO
          frontmatter={{ title: 'Hackletter', description: 'A weekly newsletter by Aravind Balla' }}
          postImage="/hl-header.jpg"
        />
        <img src="/hl-header.jpg" className="rounded-md my-8 max-w-full" alt="Hackletter" />
        <p>
          I send out a weekly letter, <i>on every Tuesday</i>, which gives you a behind-the-scenes
          look into what I'm working on, solutions and hacks that I'm building, podcast episodes I
          record and interesting reads I find.
        </p>
        <Subscribe />
        <h2>Archive</h2>
        <p className="text-gray-400 dark:text-gray-700 text-sm">
          This will get populated as I send letters. First letter is scheduled this Tuesday. ✨
        </p>
      </Layout>
    </>
  );
};

export default HomePage;
