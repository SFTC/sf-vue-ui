export const config = [
  {
    'name': 'FormTable Slot',
    'type': 'API',
    'introduce': '',
    'tableData': [
      {
        'attr': 'before-button',
        'introduce': 'form选择之前的插槽',
        'type': '元素'
      }, {
        'attr': 'placeholder',
        'introduce': 'placeholder',
        'type': 'String'
      }, {
        'attr': 'disabled',
        'introduce': '控制全部选择器是否置灰',
        'type': 'Boolean',
        'default': 'false'
      }]
  },
  {
    'name': 'Select Events',
    'type': 'Events',
    'introduce': '',
    'tableData': [
      {
        'name': 'input',
        'introduce': '传出输入框中的值组成的对象',
        'arguments': '目前选中的值'
      }]
  },
  {
    'name': 'Option Props',
    'type': 'API',
    'introduce': '',
    'tableData': [
      {
        'attr': 'value',
        'introduce': '列表展示的值',
        'type': 'String'
      },
      {
        'attr': 'label',
        'introduce': '列表传给后端的值',
        'type': 'String  Number'
      }]
  }
]
