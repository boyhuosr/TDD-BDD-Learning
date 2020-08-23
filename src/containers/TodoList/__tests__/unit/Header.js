import React from 'react';
import Header from '../../components/Header';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('Header component has a input area', ()=>{
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find("[data-test='input']")
  expect(inputElem.length).toBe(1);
}) 

it('the initial content of input should be null', ()=>{
    const wrapper = shallow(<Header />)
    const inputElem = wrapper.find("[data-test='input']")
    expect(inputElem.prop('value')).toEqual('');
  }) 

  it('the content of input should be changed based on input', ()=>{
    const wrapper = shallow(<Header />)
    const inputElem = wrapper.find("[data-test='input']")
    const userInput = 'learn Jest today'
    inputElem.simulate('change', {
        target: {value: userInput}
    })
    expect(wrapper.state('value')).toEqual(userInput);

    // const newInputElem = wrapper.find("[data-test='input']")
    // expect(newInputElem.prop('value')).toBe(userInput)
  }) 

  it('if click enter, with no content in input, no response', ()=>{
      const fn  = jest.fn()
      const wrapper = shallow(<Header addUndoItem={fn}/>)
      const inputElem = wrapper.find("[data-test='input']")
      wrapper.setState({value: ''})
      inputElem.simulate('keyup', {keyCode: 13})
      expect(fn).not.toHaveBeenCalled();
  })

  it('if click enter, with content in input, fn should be recalled', ()=>{
    const fn  = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn}/>)
    const inputElem = wrapper.find("[data-test='input']")
    const userInput = 'learn React'
    wrapper.setState({value: userInput})
    inputElem.simulate('keyUp', {keyCode: 13})
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput)
})