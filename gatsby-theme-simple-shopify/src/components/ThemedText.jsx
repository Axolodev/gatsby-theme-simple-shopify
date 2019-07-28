import { Text } from 'rebass';
import styled from 'styled-components';

const ThemedText = styled(Text)({});

ThemedText.defaultProps = {
  color: 'black',
  fontWeight: 'normal',
  fonSize: 2,
  lineHeight: 0,
  fontFamily: 'sans',
};

export default ThemedText;
