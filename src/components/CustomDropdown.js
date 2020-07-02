import React, { Component, Fragment } from 'react'

export default class CustomDropdown extends Component {
    state = {
        allSelected: 'none',
        lteCoin: [],
        region: ''
    }
    componentDidMount() {
        if (this.props.item) {
            const { lteCoin, region, allSelected } = this.props.item
            this.setState({ lteCoin, region, allSelected })
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.item !== nextProps.item) {
            const { lteCoin, region, allSelected } = nextProps.item
            this.setState({ lteCoin, region, allSelected })
        }
    }
    selectAllClick = () => {
        const { lteCoin, region, allSelected } = this.state
        let type = 'none'
        const updatedLteCoin = lteCoin.map((eachLteCoin) => {
            if (allSelected === 'all') {
                type = 'none'
                return { ...eachLteCoin, checked: false }
            } else {
                type = 'all'
                return { ...eachLteCoin, checked: true }
            }
        })
        this.props.onGroupSelect(updatedLteCoin, region, type)
    }
    selectValue = (selectedItem) => {
        const { lteCoin, region } = this.state
        const length = lteCoin.length
        let count = 0, type = 'none'
        const updatedLteCoin = lteCoin.map((eachLteCoin) => {
            if (eachLteCoin.item === selectedItem.item) {
                return { ...eachLteCoin, checked: !selectedItem.checked }
            }
            return { ...eachLteCoin }
        })
        updatedLteCoin.forEach((eachLteCoin) => {
            if (eachLteCoin.checked) {
                count = count + 1
            }
        })
        if (count === length) {
            type = 'all'
        } else if (count === 0) {
            type = 'none'
        } else {
            type = 'partial'
        }
        this.props.onGroupSelect(updatedLteCoin, region, type)
    }
    render() {
        let { allSelected, lteCoin, region } = this.state
        return <Fragment>
            <li
                key={this.props.key}
                style={{ listStyleType: "none", fontWeight: 'bold', borderTop: '1px solid #eee' }}
                onClick={this.selectAllClick}
            >
                <input type='checkbox' className={allSelected === "partial" ? "regular-checkbox" : ""} checked={allSelected === 'none' ? false : true} readOnly />
                <span>{region}</span>
            </li>
            {lteCoin.map((eachLteCoin) => <li
                key={eachLteCoin.item + this.props.key}
                style={{ listStyleType: "none", marginLeft: '20px', borderBottom: '0px' }}
                onClick={() => this.selectValue(eachLteCoin)}>
                <input type='checkbox' checked={eachLteCoin.checked} />
                <span>{eachLteCoin.item}</span>
            </li>)}
        </Fragment>
    }
}