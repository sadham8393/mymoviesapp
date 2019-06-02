import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass, findByComponent } from '../../../utils/utils';
import MovieList from '../../../src/components/Movies/MovieList';
import Movie from '../../../src/components/Movies/Movie';

describe('<MovieList /> component', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            movies :[],
            onDeleteClick : mockFunc,
            viewInfoModal : mockFunc
        };
        wrapper = shallow(<MovieList {...testProps} />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<MovieList {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render movies-container correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.movies-container');
        expect(component.length).toBe(1);
    });

    it('should render row correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.row');
        expect(component.length).toBe(1);
    });

    it('should render col correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.col');
        expect(component.length).toBe(1);
    });

    it('should render Movie correctly and to be 1', () => {
        const component = findByComponent(wrapper, Movie);
        setTimeout(() => {
            expect(component.length).toBe(1);
        })
    });
});