# React Edit Component Inline

Based off react-edit-inline, using components inline for form inputs, switching back and forth from a non-editing and editable form component.

## Usage 
```jsx
import EditInline from 'react-edit-component-inline'

<EditInline
  name='fieldname'
  component={Input or 'input'}
  componentProps={propsForComponentObject}
  disabled={false}
  validate={ifInputInvalidFunction}
  onChange={funcForChange}
  extraParams={ ...paramsForOnChangeAndBlur}
  blurOnFinish={false}
>
  {/* Text or Component for non-editing state */}
</EditInline>
```
