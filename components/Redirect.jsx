import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const RedirectWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Redirect = ({ redirectPath, customMsg }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(redirectPath);
  }, []);

  return (
    <RedirectWrapper>
      <h2>{customMsg || 'Redirecting...'}</h2>
    </RedirectWrapper>
  );
};

export default Redirect;
