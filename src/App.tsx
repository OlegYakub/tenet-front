import React from 'react';

interface AppCompProps {
  children: JSX.Element
}

const AppComp = (props: AppCompProps) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default AppComp;
