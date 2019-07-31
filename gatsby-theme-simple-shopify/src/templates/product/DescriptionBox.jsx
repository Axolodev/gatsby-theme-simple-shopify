import styled from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';
import ThemedText from '../../components/ThemedText';

const DescriptionBox = styled(ThemedText)(({ theme }) => ({
  lineHeight: theme.lineHeights[1],
  color: theme.colors.black,
  strong: {
    fontWeight: 'bold',
  },
  '& p, & ul': {
    paddingBottom: theme.space[1],
  },
  '& li': {
    paddingBottom: theme.space[3],
    marginLeft: theme.space[3],
    position: 'relative',
    '&::before': {
      content: "'-'",
      position: 'absolute',
      left: -12,
      color: theme.colors.darkPrimary,
    },
    [theme.mediaQueries[1]]: {
      marginLeft: theme.space[4],
    },
  },
}));

DescriptionBox.defaultProps = {
  as: ReactMarkdown,
};

export default DescriptionBox;
