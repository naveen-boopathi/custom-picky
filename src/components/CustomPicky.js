import React, { Component, Fragment } from 'react'
import { Picky } from 'react-picky'
import 'react-picky/dist/picky.css'
import CustomDropdown from './CustomDropdown'

export default class CustomPicky extends Component {
    state = {
        options: [],
        selectedItems: [],
        changedRegion: '',
    }
    componentDidMount() {
        if(this.props) {
            const { options, selectedItems } = this.props
            this.setState({options, selectedItems})
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props !== nextProps) {
            const { options, selectedItems } = nextProps
            this.setState({options, selectedItems})
        }
    }
    handleGroupSelect = (lteCoin, region, type) => {
        let { selectedItems, options } = this.state
        lteCoin.forEach(eachItem => {
            if(type === 'all' && eachItem.checked === false) {
                selectedItems = [...selectedItems, eachItem.item]
            } else if(type === 'none' && eachItem.checked === true) {
                selectedItems = selectedItems.filter((item) => item !== eachItem.item)
            }
        })
        const updatedOptions = options.map((eachOption) => {
            if (eachOption.region === region) {
                const updatedItems = eachOption.lteCoin.map((eachItem) => {
                    if (type === 'all') {
                        return { ...eachItem, checked: true }
                    } else {
                        return { ...eachItem, checked: false }
                    }
                })
                return { ...eachOption, lteCoin: updatedItems, allSelected: type }
            }
            return { ...eachOption }
        })
        this.setState({selectedItems, changedRegion: region, options: updatedOptions})
    }
    render() {
        return <Fragment>
            <Picky
                id="picky"
                options={this.state.options}
                value={this.state.selectedItems}
                multiple={true}
                includeSelectAll={false}
                includeFilter={false}
                onChange={(selectedItems) => this.setState({selectedItems})}
                dropdownHeight={600}
                render={(props) => {
                    return (
                        <CustomDropdown
                            key={props.index}
                            {...props}
                            selectedItems={this.state.selectedItems}
                            onGroupSelect={this.handleGroupSelect}
                            changedRegion={this.state.changedRegion}
                        />
                    );
                }}
            />
        </Fragment>
    }
}