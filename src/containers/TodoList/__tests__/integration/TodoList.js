import React from 'react';
import {mount} from 'enzyme'
import TodoList from '../../index'
import {findTestWrapper} from '../../../../utils/testUtils'
import { intersects } from 'semver';

it(`
    1. type content into input area
    2. click enter
    3. input area shows the content
`, ()=>{
    const wrapper = mount(<TodoList />)
    const inputElem = findTestWrapper(wrapper, 'input');
    const content = "learn Jest"
    inputElem.simulate('change', {
        target: {value: content}
    })
    inputElem.simulate('keyUp', {
        keyCode: 13
    })
    const listItem = findTestWrapper(wrapper, 'list-item')
    expect(listItem.length).toEqual(1)
    expect(listItem.text()).toContain(content)
})