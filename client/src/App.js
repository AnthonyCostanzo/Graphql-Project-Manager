import Nav from "./components/Nav";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "../src/pages/Home";
import Project from "../src/pages/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Nav />
          <div className="mt-10 w-[93vw] md:w-10/12 m-auto space-y-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:projectId" element={<Project />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
