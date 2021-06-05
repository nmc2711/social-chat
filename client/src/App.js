import { BrowserRouter as Router, Route } from "react-router-dom";
import RouterSwitch from "./route";

import ScrollToTop from "./common/scrollTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Route component={RouterSwitch} />
    </Router>
  );
}
export default App;
