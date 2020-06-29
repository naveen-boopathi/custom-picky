import React, { Component, Fragment } from 'react'
import { Picky } from 'react-picky'
import 'react-picky/dist/picky.css'
import CustomDropdown from './CustomDropdown'

export default class CustomPicky extends Component {
    state = {
        options: [
            { groupName: 'Fruits', items: [{ item: 'Apple', checked: false }, { item: 'Orange', checked: false }, { item: 'Grapes', checked: false }, { item: 'Watermelon', checked: false }] },
            { groupName: 'Vegetables', items: [{ item: 'Brinjal', checked: false }, { item: 'Tomato', checked: false }, { item: 'Cauliflower', checked: false }, { item: 'Onion', checked: false }] },
            { groupName: 'Spices', items: [{ item: 'Pattai', checked: false }, { item: 'Yelaka', checked: false }, { item: 'Cardamom', checked: false }, { item: 'Pepper', checked: false }] },
        ],
        selectedItems: [],
        changedGroupName: '',
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
    handleGroupSelect = (items, groupName, type) => {
        let { selectedItems, options } = this.state
        items.forEach(eachItem => {
            if(type === 'all' && eachItem.checked === false) {
                selectedItems = [...selectedItems, eachItem.item]
            } else if(type === 'none' && eachItem.checked === true) {
                selectedItems = selectedItems.filter((item) => item !== eachItem.item)
            }
        })
        const updatedOptions = options.map((eachOption) => {
            if (eachOption.groupName === groupName) {
                const updatedItems = eachOption.items.map((eachItem) => {
                    if (type === 'all') {
                        return { ...eachItem, checked: true }
                    } else {
                        return { ...eachItem, checked: false }
                    }
                })
                return { ...eachOption, items: updatedItems, allSelected: type }
            }
            return { ...eachOption }
        })
        this.setState({selectedItems, changedGroupName: groupName, options: updatedOptions})
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
                            changedGroupName={this.state.changedGroupName}
                        />
                    );
                }}
            />
        </Fragment>
    }
}