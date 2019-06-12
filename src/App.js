import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state = {
      foundPizza: '',
      pizzas: [],
      topping: '',
      size: '',
      vegetarian: ''
    }
  }

  componentDidMount(){
    // fetch pizzas from server
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzaArr => {
    this.setState({
      pizzas: pizzaArr
    })})
  }

  handleSubmit = (event) => {
    let formTopping = event.currentTarget.parentElement.parentElement.children[0].children[0].value
    let formSize = event.currentTarget.parentElement.parentElement.children[1].children[0].value

    let pizzaVal = {
      topping: formTopping,
      size: formSize,
      vegetarian: false
    }

    fetch('http://localhost:3000/pizzas',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(pizzaVal)
    })
    .then(res => res.json())
    .then(newPizza => this.setState({
      pizzas: [...this.state.pizzas, newPizza]
    }))
  }




  // onAddPizza = (event) => {
  //   console.log(event)
    // fetch('http://localhost:3000/pizzas', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify()
    // })
  // }

  handlePizzaInfo = (id) => {
    console.log('handing pizza id:', id)
    let myPizza = this.state.pizzas.filter(pizza => pizza.id === id)
    this.setState({
      foundPizza: myPizza[0]
    })
  }

  // renderEditPizzaInfo = (e) => {
  //   this.setState({
  //     pizzaform: {
  //       topping: '',
  //       size: '',
  //       veggie: false
  //     }
  //   })
  // }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          onSubmit={this.onAddPizza}
          foundPizza={this.state.foundPizza}
          handleSubmit={this.handleSubmit}
        />
        <PizzaList
        pizzas={this.state.pizzas}
        handlePizzaInfo={this.handlePizzaInfo}
        />
      </Fragment>
    );
  }
}

export default App;
