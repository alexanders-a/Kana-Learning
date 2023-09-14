import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./routes/Routes";
import { CSSReset } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CSSReset />
      <Provider store={store}>
        <Router>
          <Routes>
            {routes?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element}></Route>
            ))}
          </Routes>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
