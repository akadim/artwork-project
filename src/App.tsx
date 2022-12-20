import { useState } from 'react'
import './App.css'
import {Container} from "react-bootstrap";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";

function App() {



  return (
      <ShoppingCartProvider>
          <Container>
              <Header />
              <Products />
          </Container>
      </ShoppingCartProvider>
  )
}

export default App
