import { lazy, Suspense } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const WebSocketClient = lazy ( () => import('./routers/pages/home/webSocket_client'))

function App() {
  return (
    <Router>
      <Suspense fallback = {<div>Loading...</div>}>
        <Routes>
          <Route path = "/websocket-client" element = {<WebSocketClient/>}></Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
export default App