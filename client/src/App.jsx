import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/about" component={About} />
        <Route>404 Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
