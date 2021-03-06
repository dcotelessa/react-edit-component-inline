import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditInline extends Component {
  static propTypes = {
    blurOnFinish: PropTypes.bool,
    children: PropTypes.object,
    component: PropTypes.any.isRequired,
    componentProps: PropTypes.object,
    disabled: PropTypes.bool,
    extraParams: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFormat: PropTypes.func,
    style: PropTypes.object,
    validate: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired, PropTypes.bool.isRequired]),
  }

  static defaultProps = {
    blurOnFinish: false,
    children: undefined,
    componentProps: {},
    disabled: false,
    extraParams: {},
    onChange: null,
    onFormat: null,
    style: {},
    validate: null,
    value: '',
  }

  state = {
    editable: false,
    value: this.props.value,
  }

  /**
   * Triggered When a Field Value is Blur
   * @param {Object} e change event of input
   * @param {boolean} blurOnFinish if the input finished after updating its value
   */
  onFieldBlur = (e, extraParams) => {
    const { onChange, validate, name } = this.props
    if (onChange) {
      if (typeof validate === 'function') {
        if (validate(e.target.value)) {
          onChange(e.target.value, name, extraParams)
        }
      } else {
        onChange(e.target.value, name, extraParams)
      }
    }
    if (extraParams.onBlur) {
      extraParams.onBlur(e)
    }
    this.onFinishEditing()
  }

  /**
   * Triggered When a Field Value is Changed
   * @param {Object} e change event of input
   * @param {boolean} blurOnFinish if the input finished after updating its value
   */
  onFieldChange = (e, blurOnFinish, extraParams) => {
    this.setState({ value: e.target.value })
    if (blurOnFinish) {
      this.onFieldBlur(e, extraParams)
      this.onFinishEditing()
    }
    if (extraParams.onChange) extraParams.onChange(e)
  }

  // enables the component to be editable using the editable state
  onEditEnable = () => {
    this.setState({ editable: true })
  }

  // finish the editing of the component using the editable state
  onFinishEditing = () => {
    this.setState({ editable: false })
  }

  /**
   * builds the input using the type prop attaching all the required props
   * and events
   * @returns {Object} rendered Input or Component
   */
  getEditComponent = () => {
    const {
      blurOnFinish,
      children,
      component,
      componentProps,
      disabled,
      extraParams,
      onFormat,
      style,
    } = this.props
    const InlineComponent = component

    const fieldProps = {
      onChange: e => this.onFieldChange(e, blurOnFinish, extraParams),
      disabled,
      onBlur: e => (blurOnFinish ? null : this.onFieldBlur(e, extraParams)),
      autoFocus: true,
      value: this.state.value,
      ...componentProps,
    }

    if (blurOnFinish) {
      fieldProps.finishEdit = this.onFinishEditing
    }

    if (!this.state.editable) {
      return (
        <span
          onClick={disabled ? null : this.onEditEnable}
          style={style}
        >
          {onFormat ? onFormat(fieldProps) : children}
        </span>
      )
    }
    return <InlineComponent {...fieldProps} />
  }

  render () {
    return this.getEditComponent()
  }
}
