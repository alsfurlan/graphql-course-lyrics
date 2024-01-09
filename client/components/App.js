import React from 'react';
import Header from './Header';

export default ({ children }) => {
  return (
    <section >
      <Header />
      <div className="container">{children}</div>
    </section>
  );
};
