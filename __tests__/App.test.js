import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import Home from '../src/components/Home';
import { testStore } from '../utils/utils';

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = mount(
                    <Provider store={store}>
                            <Home />
                    </Provider>);
    return wrapper;
};
describe('<App />', () => {
    let wrapper,
        initialState;
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
        expect(wrapper).toMatchSnapshot();
    });
});