import React, { Component, Fragment } from 'react'

export default class CustomDropdown extends Component {
    constructor() {
        super()
        this.state = {
            allSelected: 'none',
            items: [],
            groupName: ''
        }
    }
    componentDidMount() {
        if (this.props.item) {
            const { items, groupName } = this.props.item
            const { allSelected } = this.props
            this.setState({ items, groupName, allSelected })
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.item !== nextProps.item && this.state.groupName === nextProps.changedGroupName) {
            const { items, groupName } = nextProps.item
            const { allSelected } = nextProps
            this.setState({ items, groupName, allSelected })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.items !== nextState.items) {
            return true
        } else if (this.state.groupName !== nextProps.changedGroupName) {
            return false
        }
        return true
    }
    selectAllClick = () => {
        const { items, groupName, allSelected } = this.state
        this.props.onGroupSelect(items, groupName, allSelected === 'all' ? 'none' : 'all')
    }
    selectValue = (selectedItem) => {
        this.setState((prevState) => {
            const length = prevState.items.length
            let count = 0
            const updatedItems = prevState.items.map(eachItem => {
                if (eachItem.item === selectedItem.item) {
                    this.props.selectValue(selectedItem.item)
                    return { ...eachItem, checked: !selectedItem.checked }
                }
                return { ...eachItem }
            })
            updatedItems.forEach((eachItem) => {
                if (eachItem.checked) {
                    count = count + 1
                }
            })
            if (count === length) {
                return { allSelected: 'all', items: updatedItems }
            } else if (count === 0) {
                return { allSelected: 'none', items: updatedItems }
            } else {
                return { allSelected: 'partial', items: updatedItems }
            }
        })
    }
    render() {
        let { allSelected, items, groupName } = this.state
        return <Fragment>
            <li
                style={{ ...this.props.style, listStyleType: "none" }}
                onClick={this.selectAllClick}
            >
                <input type='checkbox' className={allSelected === "partial" ? "regular-checkbox" : ""} checked={allSelected === 'none' ? false : true} readOnly />
                <span style={{ fontSize: '30px', marginLeft: '5px' }}>{groupName}</span>
            </li>
            {items.map((eachItem) => <li
                style={{ listStyleType: "none", marginLeft: '20px' }}
                onClick={() => this.selectValue(eachItem)}>
                <input type='checkbox' checked={eachItem.checked} readOnly />
                <span style={{ fontSize: '30px', marginLeft: '5px' }}>{eachItem.item}</span>
            </li>)}
        </Fragment>
    }
}