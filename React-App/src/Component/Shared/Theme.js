import { createMuiTheme } from '@material-ui/core/styles';
import primaryColor from '@material-ui/core/colors/blueGrey';
import secondaryColor from '@material-ui/core/colors/brown';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: primaryColor,
    secondary: secondaryColor
  }
});