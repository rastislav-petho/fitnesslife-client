import { FC } from 'react';
import ReactLoading from 'react-loading';

export const Loading: FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff98'
      }}>
      <ReactLoading type={'spinningBubbles'} color="#f50057" height={'100px'} width={'100px'} />
    </div>
  );
};
