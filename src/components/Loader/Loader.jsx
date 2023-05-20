import { ThreeDots } from 'react-loader-spinner';

export function Loader() {
  return (
    <ThreeDots
      height="100"
      width="100"
      radius="5"
      color="red"
      ariaLabel="three-dots-loading"
      wrapperClassName=""
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
      visible={true}
    ></ThreeDots>
  );
}
