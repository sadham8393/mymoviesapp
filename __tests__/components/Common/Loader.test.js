import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass } from '../../../utils/utils';
import Loader from '../../../src/components/Common/Loader';

describe('<Loader />', () => { 
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Loader />);
    });
    it('should render correctly', () => {
        const tree = renderer.create(<Loader />);
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('should expect main-loader to be 1', () => {
        const component = findByTestClass(wrapper, '.main-loader');
        expect(component.length).toBe(1);
    });
   
    it('should render preloader-wrapper correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.preloader-wrapper');
        expect(component.length).toBe(1);
    });

    it('should render spinner-layer correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.spinner-layer');
        expect(component.length).toBe(1);
    });

    it('should render circle-clipper correctly and to be 2', () => {
        const component = findByTestClass(wrapper, '.circle-clipper');
        expect(component.length).toBe(2);
    });

    it('should render circle correctly and to be 3', () => {
        const component = findByTestClass(wrapper, '.circle');
        expect(component.length).toBe(3);
    });

    it('should render loading-text correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.loading-text');
        expect(component.length).toBe(1);
    });    
});