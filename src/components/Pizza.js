import React from "react"

const Pizza = (props) => {

  const {pizza: {topping, size, vegetarian, id} } = props

  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian.toString()}</td>
      <td><button type="button" onClick={() => props.handlePizzaInfo(id)}   className="btn btn-primary" data-set-pizza-id={id}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
