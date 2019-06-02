import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass, findByComponent , testStore } from '../../utils/utils';
import Home from '../../src/components/Home';
import SearchField from '../../src/components/SearchField';
import Header from '../../src/components/Nav';
import MovieList from '../../src/components/Movies/MovieList';
import Alert from '../../src/components/Common/Alert';
import { INPUT_TYPE_TEXT, INPUT_TYPE_SELECT } from '../../src/utils/constants';

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Home store={store} />).childAt(0).dive();;
    return wrapper;
};

describe('<Home /> component', () => { 
    let wrapper,
        initialState;
    const event = {
        preventDefault() {},
        target :{value : "Test"}
    };
    let fieldType = INPUT_TYPE_TEXT;
    beforeEach(() => {
        initialState = {movies :{
            isLoading : false,
            moviesList: {
                "page": 1,
                "results": [
                {
                    "adult": false,
                    "backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
                    "genre_ids": [ 28, 12, 14, 878],
                    "id": 299536,
                    "original_language": "en",
                    "original_title": "Avengers: Infinity War",
                    "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
                    "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                    "release_date": "2018-04-25",
                    "title": "Avengers: Infinity War",
                    "video": false,
                    "vote_average": 8.3,
                    "vote_count": 6937,
                    "popularity": 358.799
                }
                ],
                "total_pages": 1,
                "total_results": 1
            }
          }};
          wrapper = setUp(initialState);
    });

    it('should render correctly', () => {
        const store = testStore(initialState);
        const component = renderer.create(<Home store={store} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Should render without errors', () => {
        const component = findByTestClass(wrapper, '.home-container');
        expect(component.length).toBe(1);
    });

    it('should render search field and length to be 1', () => {
        const component = findByComponent(wrapper, SearchField);
        expect(component.length).toBe(1);
    });

    it('should render Header and length to be 1', () => {
        const component = findByComponent(wrapper, Header);
        expect(component.length).toBe(1);
    });
    
    it('should render MovieList and length to be 1', () => {
        const component = findByComponent(wrapper, MovieList);
        expect(component.length).toBe(1);
    });

    it('should render Alert and length to be 1', () => {
        const component = findByComponent(wrapper, Alert);
        expect(component.length).toBe(1);
    });

    it('handleSearch Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        classInstance.handleSearch(event);
        const newState = classInstance.state.fieldValid;
        expect(newState).toBe(false);
    });

    it('handleSearch Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        classInstance.handleSearch(event);
        const newState = classInstance.state.initialLoading;
        expect(newState).toBe(false);
    });

    it('handleChange Method should update state as expected if the field type is text', () => {
        const classInstance = wrapper.instance();
        classInstance.handleChange(event, fieldType);
        const newState = classInstance.state.searchBtnDisabled;
        expect(newState).toBe(false);
    });

    it('handleChange Method should update state as expected if the field type is select', () => {
        fieldType = INPUT_TYPE_SELECT;
        const classInstance = wrapper.instance();
        classInstance.handleChange(event, fieldType);
        const newState = classInstance.state.searchBtnDisabled;
        expect(newState).toBe(true);
    });

    it('closeAlert Method should update alertClass in state', () => {
        const classInstance = wrapper.instance();
        classInstance.closeAlert();
        const newState = classInstance.state.alertClass;
        expect(newState).toBe("hide");
    });

    it('headerClick Method should update initialLoading in state', () => {
        const classInstance = wrapper.instance();
        classInstance.headerClick();
        classInstance.state.initialLoading = false;
        const newState = !classInstance.state.initialLoading;
        expect(newState).toBe(true);
    });

    it('viewInfoModal Method should update infoModalOpen in state', () => {
        const classInstance = wrapper.instance(),
              currentMovieDetails = {};
        classInstance.viewInfoModal(currentMovieDetails);
        const newState = classInstance.state.infoModalOpen;
        expect(newState).toBe(true);
    });

    it('viewInfoModal Method should update currentMovie in state', () => {
        const classInstance = wrapper.instance(),
              currentMovieDetails = {movieName : "Avengers"};
        classInstance.viewInfoModal(currentMovieDetails);
        const newState = classInstance.state.currentMovie;
        expect(newState).toBe(currentMovieDetails);
    });

    it('closeInfoModal Method should update infoModalOpen in state', () => {
        const classInstance = wrapper.instance();
        classInstance.closeInfoModal();
        const newState = classInstance.state.infoModalOpen;
        expect(newState).toBe(false);
    });
    it('closeInfoModal Method should update currentMovie in state', () => {
        const classInstance = wrapper.instance();
        classInstance.closeInfoModal();
        const newState = classInstance.state.currentMovie;
        expect(newState).toBe(null);
    });
    
});