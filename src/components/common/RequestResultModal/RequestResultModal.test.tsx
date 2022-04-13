import React from 'react';
import renderer from 'react-test-renderer';
import RequestResultModal from './RequestResultModal'

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <RequestResultModal requestResult={true} visible={true} errorText='' successText=''>Facebook</RequestResultModal>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});