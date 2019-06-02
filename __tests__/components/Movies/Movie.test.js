import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass, findByComponent } from '../../../utils/utils';
import Movie from '../../../src/components/Movies/Movie';
import DeleteButton  from "../../../src/components/Common/DeleteButton";

describe('<Movie /> component', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            image : "img",
            movieTitle : "Avengers",
            movie:{ title : "Avengers"},
            onDeleteClick : mockFunc,
            viewInfoModal : mockFunc
        };
        wrapper = shallow(<Movie {...testProps} />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<Movie {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render movies-card correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.movies-card');
        expect(component.length).toBe(1);
    });

    it('should render movies-card correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.movies-card');
        expect(component.length).toBe(1);
    });

    it('should render card-image correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.card-image');
        expect(component.length).toBe(1);
    });

    it('should render movie-image correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.movie-img');
        expect(component.length).toBe(1);
    });

    it('should render card-content correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.card-content');
        expect(component.length).toBe(1);
    });

    it('should render overview button correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.overview');
        expect(component.length).toBe(1);
    });

    it('overview button Should emit callback on click event', () => {
        const button = findByTestClass(wrapper, '.overview');
        button.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });

    it('should render deleteBtn correctly and to be 1', () => {
        const button = findByComponent(wrapper, DeleteButton);
        expect(button.length).toBe(1);
    });
});

