import React, { Component } from 'react'
import CustomPicky from './components/CustomPicky'
import { options, selectedItems } from './components/data'
import { generateFlags } from './components/methods'
import './App.css'

class App extends Component {
  render() {
    const { updatedOptions, totalCount } = generateFlags(options, selectedItems, 'lteCoin')
    return <CustomPicky
      options={updatedOptions}
      selectedItems={selectedItems}
      totalCount={totalCount}
    />
  }
}

export default App
