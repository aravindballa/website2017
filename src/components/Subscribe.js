import React from 'react';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`);
};

const Subscribe = () => {
  const [name, setName] = React.useState(``);
  const [email, setEmail] = React.useState(``);
  const [status, setStatus] = React.useState(`READY`);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  return (
    <form
      name="mailing-list"
      data-netlify={true}
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');
        try {
          const res = await fetch(`/`, {
            method: `POST`,
            headers: { [`Content-Type`]: `application/x-www-form-urlencoded` },
            body: encode({ [`form-name`]: `mailing-list`, name, email }),
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
        <h3 className="m-0">Get letters from me 🙌</h3>
        <p className="text-base mt-4">
          I occasionally send letters to your email about things I'm currently learning,{' '}
          <strong>articles</strong> I write, <strong>books</strong> I read, the{' '}
          <strong>podcasts</strong> I record and places I <strong>travel</strong> to. I call it -{' '}
          <i>Hackletter</i>. I'd love to share and discuss them with you!
        </p>
        {status === 'READY' && (
          <div className="flex mt-4 gap-y-2 md:gap-x-2 md:gap-y-0 flex-col md:flex-row">
            <input
              id="name"
              type="text"
              className="px-3 py-1 dark:bg-purple-800 dark-bg-opacity-25 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              id="email"
              type="email"
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
        {status === `DONE` ? <p className="m-0 text-center w-full">Thanks 🎉</p> : null}
        {status === `ERROR` ? (
          <p className="m-0 text-center w-full text-sm">
            Something went wrong. Could you refresh page and retry? 🙊
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default Subscribe;
