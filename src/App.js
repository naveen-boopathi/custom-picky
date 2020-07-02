import React, { Component, Fragment } from 'react'
import './App.css'
import CustomPicky from './components/CustomPicky'

class App extends Component {
  state = {
    options: [],
    selectedItems: ['New Jersey', 'Michigan', 'LAB', 'Central Texas'],
    totalCount: 0
  }
  componentDidMount() {
    this.generateOptions()
  }
  findTotalCount = (options, key) => {
    let count = 0
    options.forEach(eachOption => {
      count = count + eachOption[key].length
    })
    return count
  }
  generateOptions = () => {
    const options = [
      {
        region: "Carolinas/Tennessee",
        lteCoin: [
          "Carolinas/Tennessee"
        ]
      },
      {
        region: "Central Texas",
        lteCoin: [
          "Central Texas",
          "LAB"
        ]
      },
      {
        region: "Florida",
        lteCoin: [
          "Florida"
        ]
      },
      {
        region: "Georgia/Alabama",
        lteCoin: [
          "Georgia/Alabama"
        ]
      },
      {
        region: "Great Plains",
        lteCoin: [
          "Bloomington/Omaha"
        ]
      },
      {
        region: "Houston/Gulf Coast",
        lteCoin: [
          "Houston/Gulf Coast"
        ]
      },
      {
        region: "Illinois/Wisconsin",
        lteCoin: [
          "Illinois/Wisconsin"
        ]
      },
      {
        region: "IMS Core",
        lteCoin: [
          "IMS Core"
        ]
      },
      {
        region: "Kansas/Missouri",
        lteCoin: [
          "Kansas/Missouri"
        ]
      },
      {
        region: "Michigan/Indiana/Kentucky",
        lteCoin: [
          "Indiana/Kentucky",
          "Michigan"
        ]
      },
      {
        region: "Mountain",
        lteCoin: [
          "Aurora/West Jordan"
        ]
      },
      {
        region: "New England",
        lteCoin: [
          "New England"
        ]
      },
      {
        region: "New York Metro",
        lteCoin: [
          "New York Metro"
        ]
      },
      {
        region: "Northern CA",
        lteCoin: [
          "Rocklin/Sunnyvale"
        ]
      },
      {
        region: "Ohio/Pennsylvania",
        lteCoin: [
          "Ohio",
          "Western Pennsylvania"
        ]
      },
      {
        region: "Pacific Northwest",
        lteCoin: [
          "Anchorage/Redmond",
          "Hillsboro/Redmond",
          "Mililani/Hillsboro",
          "Redmond Ridge/Hillsboro"
        ]
      },
      {
        region: "Philadelphia Tri-State",
        lteCoin: [
          "New Jersey",
          "Philadelphia Tri-State"
        ]
      },
      {
        region: "South Central",
        lteCoin: [
          "South Central"
        ]
      },
      {
        region: "Southern CA",
        lteCoin: [
          "Azusa/Vista"
        ]
      },
      {
        region: "Southern Virginia",
        lteCoin: [
          "Virginia"
        ]
      },
      {
        region: "Southwest",
        lteCoin: [
          "Southwest"
        ]
      },
      {
        region: "unknown",
        lteCoin: [
          "unknown"
        ]
      },
      {
        region: "Upstate New York",
        lteCoin: [
          "Upstate New York"
        ]
      },
      {
        region: "Visible",
        lteCoin: [
          "Visible"
        ]
      },
      {
        region: "Washington/Baltimore",
        lteCoin: [
          "Washington/Baltimore"
        ]
      }
    ]
    const totalCount = this.findTotalCount(options, 'lteCoin')
    const { selectedItems } = this.state
    const updatedOptions = options.map((eachOption) => {
      const length = eachOption.lteCoin.length
      let count = 0
      const updatedItems = eachOption.lteCoin.map((eachItem) => {
        if (selectedItems.indexOf(eachItem) !== -1) {
          return { item: eachItem, checked: true }
        } else {
          return { item: eachItem, checked: false }
        }
      })
      updatedItems.forEach((eachItem) => {
        if (eachItem.checked) {
          count = count + 1
        }
      })
      if (count === length) {
        return { ...eachOption, allSelected: 'all', lteCoin: updatedItems }
      } else if (count === 0) {
        return { ...eachOption, allSelected: 'none', lteCoin: updatedItems }
      } else {
        return { ...eachOption, allSelected: 'partial', lteCoin: updatedItems }
      }
    })
    console.log(updatedOptions)
    this.setState({ options: updatedOptions, totalCount })
  }
  render() {
    return <CustomPicky
      options={this.state.options}
      selectedItems={this.state.selectedItems}
      totalCount={this.state.totalCount}
    />
  }
}

export default App
