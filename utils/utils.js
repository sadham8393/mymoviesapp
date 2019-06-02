import configureStore from 'redux-mock-store'

export const findByTestClass = (component, className) => {
    const wrapper = component.find(`${className}`);
    return wrapper;
};

export const findByComponent = (component, innerComponent) => {
    const wrapper = component.find(innerComponent);
    return wrapper;
};

export const testStore = (initialState) => {
    let store;
    const mockStore = configureStore();
    store = mockStore(initialState)
    return store;
};