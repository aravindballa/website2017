import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticImage } from 'gatsby-plugin-image';

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
            body: encode({
              [`form-name`]: `mailing-list`,
              name,
              lastname,
              email,
              tags: 'next-notion',
            }),
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
      <div className="my-8 px-6 py-8 dark:bg-purple-900 bg-opacity-100 dark-bg-opacity-25 bg-purple-100 rounded-md">
        <h3 className="m-0">Know when it's ready! 📬</h3>
        {/* <p className="text-sm mt-4">
          <input type="checkbox" name="opt-in-hackletter" id="oh" defaultValue={true} /> I'd also like to
          opt-in to recieve Hackletter mails.
        </p> */}

        {status === 'READY' && (
          <div className="flex mt-4 gap-y-2 md:gap-x-2 md:gap-y-0 flex-col md:flex-row">
            <input
              id="name"
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
              GET IN
            </button>
          </div>
        )}
        {status === `SUBMITTING` ? <p className="m-0 text-center w-full">Submitting 🙇‍♂️</p> : null}
        {status === `DONE` ? (
          <p className="m-0 text-center w-full">Awesome! I'll let you know 🎉</p>
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

const NextNotionPage = ({ location }) => {
  return (
    <>
      <Helmet>
        <script async src="https://gumroad.com/js/gumroad.js"></script>
      </Helmet>
      <Layout location={location}>
        <SEO
          frontmatter={{
            title: 'How to build a blog with Next JS and Notion',
            description:
              'Learn how to build a modern, fast and static blog with all the features like RSS, comments and strong SEO using amazing open source technologies.',
          }}
          postImage="/next-notion-header.jpg"
        />
        <h1>Build a blog using Next JS and Notion as your CMS</h1>
        <StaticImage
          src="../assets/next-notion-header.jpg"
          className="rounded-md my-8 max-w-full"
          alt="NextJS Notion course header"
          placeholder="tracedSVG"
        />

        <p>
          Learn how to build a modern, fast and static blog with all the features like RSS, comments
          and strong SEO using amazing open source technologies.
        </p>

        <h2 id="highlights">Highlights ✨</h2>
        <ul>
          <li>
            NextJS / React and <strong>Typescript</strong>
          </li>
          <li>
            Deployed to <strong>Vercel</strong>
          </li>
          <li>
            Content comes from <strong>Notion</strong>
          </li>
          <li>
            Styled using <strong>Tailwind CSS</strong>
          </li>
          <li>
            Comments using <a href="http://utteranc.es/">utteranc.es</a>
          </li>
        </ul>
        <blockquote>This is how I&#39;d be building a blog today! 🚀</blockquote>

        <h2 id="course-structure">Course structure ⚔️</h2>
        <p>
          All videos are <strong>100% free</strong>. However, you can support me by{' '}
          <strong>paying-what-you-want</strong> on <a href="https://gunm.co/next-notion">Gumroad</a>
          .
        </p>

        <a className="gumroad-button mx-auto mb-4" href="https://gum.co/next-notion">
          Checkout on Gumroad
        </a>

        <ol className="list-decimal">
          <li>Setting up Notion for content</li>
          <li>Initialize NextJS project and styles</li>
          <li>Creating blog pages</li>
          <li>Creating an index page for all the articles</li>
          <li>Adding RSS, meta tags and OG images for SEO</li>
          <li>Comments functionality using Utterances</li>
          <li>Deploying it to Vercel</li>
          <li>Bonus: Re-building your site using Siri shortcuts</li>
        </ol>
        <p className="mt-8">
          <em>This would likely change as I record them.</em>
        </p>
        <h2 id="who-is-creating-this">Who is creating this? 🤔</h2>
        <p>
          Hi, I&#39;m Aravind Balla 👋 – JavaScript developer, writer and podcaster.{' '}
          <a href="https://aravindballa.com">More about me</a>.
        </p>
        <p>
          I&#39;ve build few websites that have a similar setup, mainly a{' '}
          <a href="https://satyaballa.com/">blog for my sister</a> and a site to{' '}
          <a href="https://work-from-places.vercel.app/">document cafes I work from</a>. This course
          is a distillation of all the things I&#39;ve learnt while building and maintaining them.
        </p>

        <Subscribe />
      </Layout>
    </>
  );
};

export default NextNotionPage;
