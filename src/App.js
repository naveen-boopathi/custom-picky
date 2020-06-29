import React, { Component, Fragment } from 'react'
import './App.css'
import CustomPicky from './components/CustomPicky'

class App extends Component {
  state = {
    options: [],
    selectedItems: ['Apple', 'Orange', 'Grapes', 'Yelaka']
  }
  componentDidMount() {
    this.generateOptions()
  }
  generateOptions() {
    const options = [
      { groupName: 'Fruits', items: [{ item: 'Apple' }, { item: 'Orange' }, { item: 'Grapes' }, { item: 'Watermelon' }] },
      { groupName: 'Vegetables', items: [{ item: 'Brinjal' }, { item: 'Tomato' }, { item: 'Cauliflower' }, { item: 'Onion' }] },
      { groupName: 'Spices', items: [{ item: 'Pattai' }, { item: 'Yelaka' }, { item: 'Cardamom' }, { item: 'Pepper' }] },
    ]
    const { selectedItems } = this.state
    const updatedOptions = options.map((eachOption) => {
      const length = eachOption.items.length
      let count = 0
      const updatedItems = eachOption.items.map((eachItem) => {
        if (selectedItems.indexOf(eachItem.item) !== -1) {
          return { ...eachItem, checked: true }
        } else {
          return { ...eachItem, checked: false }
        }
      })
      updatedItems.forEach((eachItem) => {
        if (eachItem.checked) {
          count = count + 1
        }
      })
      if (count === length) {
        return { ...eachOption, allSelected: 'all', items: updatedItems }
      } else if (count === 0) {
        return { ...eachOption, allSelected: 'none', items: updatedItems  }
      } else {
        return { ...eachOption, allSelected: 'partial', items: updatedItems  }
      }
    })
    this.setState({options: updatedOptions})
  }
  render() {
    return <CustomPicky options={this.state.options} selectedItems={this.state.selectedItems}/>
  }
}

export default App
