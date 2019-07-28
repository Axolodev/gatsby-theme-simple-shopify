import { Button } from 'rebass';
import styled from 'styled-components';

const ThemedButton = styled(Button)({});

ThemedButton.defaultProps = {
  bg: 'darkPrimary',
  color: 'white',
  fontWeight: 'normal',
  lineHeight: 0,
  borderRadius: 0,
  fontFamily: 'sans',
};

export default ThemedButton;
