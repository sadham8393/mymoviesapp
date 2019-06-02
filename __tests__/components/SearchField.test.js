import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass, findByComponent } from '../../utils/utils';
import SearchField from '../../src/components/SearchField';

describe('<SearchField /> component', () => { 
    let wrapper,
        testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            handleSearch : mockFunc,
            handleChange : mockFunc,
            searchBtnDisabled : false
        };
        wrapper = shallow(<SearchField {...testProps} />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<SearchField {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render search-container correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.search-container');
        expect(component.length).toBe(1);
    });

    it('should render row correctly and to be 1', () => {
        const component = findByTestClass(wrapper, 'form.row');
        expect(component.length).toBe(1);
    });

    it('should render input-field correctly and to be 3', () => {
        const component = findByTestClass(wrapper, '.input-field');
        expect(component.length).toBe(3);
    });

    it('should render textfield correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.validate');
        expect(component.length).toBe(1);
    });

    it('should emit callback when textfield value is changed and to be 1', () => {
        const textfield = findByTestClass(wrapper, '.validate');
        textfield.simulate('change', { target: { value: 'New Comment' } });
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);

    });

    it('should render error div correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.helper-text');
        expect(component.length).toBe(1);
    });

    it('should render select field correctly and to be 1', () => {
        const component = findByComponent(wrapper, 'select');
        expect(component.length).toBe(1);
    });

    it('should emit callback when select field value is changed and to be 1', () => {
        const selectField = findByComponent(wrapper, 'select');
        selectField.simulate('change', { target: { value: 'New Comment' } });
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });

    it('should render search button correctly and to be 1', () => {
        const component = findByComponent(wrapper, 'button');
        expect(component.length).toBe(1);
    });

    it('should emit callback when search button is clicked and to be 1', () => {
        const selectField = findByComponent(wrapper, 'button');
        selectField.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });

});