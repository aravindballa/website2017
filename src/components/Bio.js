import React from 'react';

import profilePic from './profile-pic.jpg';

class Bio extends React.Component {
  render() {
    return (
      <div className="flex py-6 mt-8 border-t-2 border-gray-500 items-center">
        <img className="rounded-full w-16 h-16" src={profilePic} alt={`Aravind Balla`} />
        <p className="text-green ml-6">
          By <strong>Aravind Balla</strong> who is a friendly human, building things for himself,
          and sometimes for others.{' '}
          <a
            className="text-green dark:text-green"
            href="https://twitter.com/aravindballa"
            target="_blank"
          >
            You should hit him up on Twitter!
          </a>
        </p>
      </div>
    );
  }
}

export default Bio;
