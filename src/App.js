import React from 'react';
import { useSelector} from 'react-redux';


import Leads from 'components/leads/leads';
import ToastMessage from 'components/shared/toast_message'


const App = (props) => {
  const toastProps = useSelector(state => {
    return state?.interfaces?.toast || {};
  });

  return (
    <>
      <ToastMessage {...toastProps } />
      <Leads />
    </>
  );
};

export default App;
